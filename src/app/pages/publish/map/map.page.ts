import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../../services/location.service";
import {GeocodingService} from "../../../services/geocoding.service";
import * as L from "leaflet";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Address} from "../../../interfaces/address";
import {Coordinates} from "../../../interfaces/Coordinates";
import {TravelService} from "../../../services/travel.service";
import {TravelModel} from "../../../models/travel-model";
import {TrailService} from "../../../services/trail.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class Map implements OnInit {
  leafletMap: any;
  zoom: number = environment.mapZoom;
  originAddress!: Address;
  destinyAddress!: Address;
  origin: boolean = false;
  destiny: boolean = false;
  loadingPosition: boolean = true;

  constructor(
    public locationService: LocationService,
    private geocodingService: GeocodingService,
    private route: ActivatedRoute,
    private router: Router,
    private travelService: TravelService,
    private trailService: TrailService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
        const currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation && currentNavigation.extras?.state) {
          const state = currentNavigation.extras.state;

          if (state['origin'] == true) {
            if (state['originAddress']) {
              this.originAddress = state['originAddress'] as Address;
              this.origin = true;
              this.destiny = false;
              this.mapInit();
              this.setCenter({lat: this.originAddress.lat, lng: this.originAddress.lon}, 16)
            } else {
              this.origin = true;
              this.destiny = false;
              this.mapInit();
              this.getCurrentPosition()
            }
          } else if (state['destiny'] == true) {
            if (state['destinyAddress']) {
              this.destinyAddress = state['destinyAddress'] as Address;
              this.destiny = true;
              this.origin = false;
              this.mapInit();
              this.setCenter({lat: this.destinyAddress.lat, lng: this.destinyAddress.lon}, 16)
            } else {
              this.destiny = true;
              this.origin = false;
              this.mapInit();
              this.getCurrentPosition()
            }
          } else if (state['origin'] == false && state['destiny'] == false) {
            if (state['trailInfo']) {
              console.warn('Trail info');
              this.destiny = false;
              this.origin = false;
              this.getRouteTrail();
            }
          }
        } else {
          this.setCenter({
            lat: environment.defaultPosition.latitude,
            lng: environment.defaultPosition.lontitude,
          }, 16);
        }
      }
    )
    ;
  }

  mapInit() {
    this.leafletMap = new L.Map('leafletMap');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.leafletMap);
    this.leafletMap.whenReady(() => {
      setTimeout(() => {
        this.leafletMap.invalidateSize();
      }, 10);
    });
  }

  setPosition() {
    if (this.origin || this.destiny) {
      const leafletCenter = this.leafletMap.getCenter();
      this.geocodingService.getAddressFromLatLng(leafletCenter.lat, leafletCenter.lng).subscribe(addressResult => {
        const travelData: TravelModel = this.travelService.travelData;
        if (this.origin) {
          travelData.origin = {
            name: this.originAddress.name,
            address: addressResult.name,
            townName: addressResult.addressData.town || this.originAddress.name,
            originPostalCode: addressResult.addressData.postcode,
            originCoords: {lat: addressResult.lat, lng: addressResult.lon},
          };
        }
        if (this.destiny) {
          travelData.destiny = {
            name: this.destinyAddress.name,
            address: addressResult.name,
            townName: addressResult.addressData.town || this.destinyAddress.name,
            destinyPostalCode: addressResult.addressData.postcode,
            destinyCoords: {lat: addressResult.lat, lng: addressResult.lon},
          };
        }
        const navigationExtras: NavigationExtras = {
          state: {origin: this.origin, destiny: this.destiny},
        };
        this.router.navigateByUrl('home/publish/time-selector', navigationExtras);
      });
    } else {
      this.router.navigateByUrl('home/publish/date-selector');
    }
  }

  // flyTo(userCoords: Coordinates): void {
  //   this.leafletMap.flyTo([userCoords.lat, userCoords.lng], 16, {
  //     animate: true,
  //     duration: 1,
  //   });
  // }

  getCurrentPosition()
    :
    void {
    this.locationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.leafletMap.setView([position.coords.latitude, position.coords.longitude], this.zoom);
        this.loadingPosition = false;
        this.leafletMap.whenReady(() => {
          setTimeout(() => {
            this.leafletMap.invalidateSize();
          }, 10);
        });
        // this.flyTo({lat: position.coords.latitude, lng: position.coords.longitude});
      },
      error: (error) => {
        console.error('Error getting current position:', error);
      },
    });
  }

  setCenter(centerPosition
              :
              Coordinates, zoom
              :
              number
  ) {
    this.leafletMap.setView([centerPosition.lat, centerPosition.lng], zoom);
    this.loadingPosition = false;
    this.leafletMap.whenReady(() => {
      setTimeout(() => {
        this.leafletMap.invalidateSize();
      }, 10);
    });
  }


  getRouteTrail() {
    const mockedTravelData: TravelModel = this.travelService.travelData;
    const travelData: TravelModel = this.travelService.travelData;

    if (travelData.origin?.originCoords && travelData.destiny?.destinyCoords) {
      this.trailService.getRouteTrail(travelData.origin.originCoords, travelData.destiny.destinyCoords).subscribe(trailData => {
        this.drawRoute(trailData);
      })
    } else {
      mockedTravelData.origin = {
        originCoords: {lat: 43.190913, lng: -3.199353},
      };
      mockedTravelData.destiny = {
        destinyCoords: {lat: 43.211713, lng: -3.138442},
      };
      if (mockedTravelData.origin?.originCoords && mockedTravelData.destiny?.destinyCoords) {
        this.mapInit()
        this.setCenter({
          lat: mockedTravelData.origin!.originCoords.lat,
          lng: mockedTravelData.origin!.originCoords.lng
        }, 16)
        this.trailService.getRouteTrail(mockedTravelData.origin.originCoords, mockedTravelData.destiny.destinyCoords).subscribe(trailData => {
          this.drawRoute(trailData);
        });
      }
    }
  }

  drawRoute(trailData
              :
              any
  ) {
    const pathStyle = {
      color: 'blue',
      weight: 4,
      opacity: 0.9,
    };

    const geoJSON = L.geoJSON(trailData.routes[0].geometry, {
      style: pathStyle,
    }).addTo(this.leafletMap);
    this.leafletMap.fitBounds(geoJSON.getBounds(), {
      padding: [10, 10],
      animate: true,
    });
  }

  watchPosition()
    :
    void {
    this.locationService.watchPosition().subscribe({
      next: (position) => {
        console.log('Updated Position:', position);
      },
      error: (error) => {
        console.error('Error watching position:', error);
      },
    });
  }
}
