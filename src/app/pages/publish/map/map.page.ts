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
import {Route, RouteData} from "../../../interfaces/route";
import {GeoJSON} from "leaflet";
import {GeoJsonObject} from "geojson";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class Map implements OnInit {
  leafletMap: any;
  zoom: number = environment.mapZoom
  originAddress!: Address;
  destinyAddress!: Address;

  origin: boolean = false;
  destiny: boolean = false;

  constructor(public locationService: LocationService,
              private geocodingService: GeocodingService,
              private route: ActivatedRoute,
              private router: Router,
              private travelService: TravelService,
              private trailService: TrailService) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(() => {

        const currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation && currentNavigation.extras?.state) {
          if (currentNavigation.extras.state['originAddress']) {
            this.originAddress = currentNavigation.extras.state['originAddress'] as Address;
            this.origin = true;
            this.destiny = false;
            this.mapInit({lat: this.originAddress.lat, lng: this.originAddress.lon})
          } else if (currentNavigation.extras.state['destinyAddress']) {
            this.destinyAddress = currentNavigation.extras.state['destinyAddress'] as Address;
            this.destiny = true;
            this.origin = false
            this.mapInit({lat: this.destinyAddress.lat, lng: this.destinyAddress.lon})
          } else if (currentNavigation.extras.state['trailInfo']) {
            //     this.getRouteTrail()
            this.mapInit({
              lat: environment.defaultPosition.latitude,
              lng: environment.defaultPosition.lontitude
            })
          } else {
            this.mapInit({
              lat: environment.defaultPosition.latitude,
              lng: environment.defaultPosition.lontitude
            })
          }
        } else {
          this.mapInit({
            lat: environment.defaultPosition.latitude,
            lng: environment.defaultPosition.lontitude
          })
        }
      }
    )
    this.getRouteTrail()
  }


  getRouteTrail() {
    const travelData: TravelModel = this.travelService.travelData;
    console.warn(travelData)

    if (travelData.origin?.originCoords && travelData.destiny?.destinyCoords) {
      this.trailService.getRouteTrail(travelData.origin.originCoords, travelData.destiny.destinyCoords).subscribe(res => {
        console.warn(res)
      })

    } else {
      const mockedTravelData: TravelModel = this.travelService.travelData;
      mockedTravelData.origin = {
        originCoords: {lat: 43.190913, lng: -3.199353}
      }
      mockedTravelData.destiny = {
        destinyCoords: {lat: 43.211713, lng: -3.138442}
      }
      if (mockedTravelData.origin?.originCoords && mockedTravelData.destiny?.destinyCoords)
        this.trailService.getRouteTrail(mockedTravelData.origin.originCoords, mockedTravelData.destiny.destinyCoords).subscribe(trailData => {
          this.drawRoute(trailData)
        })
    }
  }

  drawRoute(trailData: RouteData) {
    const pathStyle = {
      "color": "blue",
      "weight": 4,
      "opacity": 0.9
    };

    // @ts-ignore
    const geoJSON = L.geoJSON(trailData.routes[0].geometry, {
      style: pathStyle
    }).addTo(this.leafletMap);
    this.leafletMap.fitBounds(geoJSON.getBounds(), {
      padding: [10, 10],
      animate: true
    })
  }

  setPosition() {
    const leafletCenter = this.leafletMap.getCenter();
    this.geocodingService.getAddressFromLatLng(leafletCenter.lat, leafletCenter.lng).subscribe(addressResult => {
      if (this.origin) {
        const travelData: TravelModel = this.travelService.travelData;
        travelData.origin = {
          name: addressResult.name,
          originPostalCode: addressResult.addressData.postcode,
          originCoords: {lat: addressResult.lat, lng: addressResult.lon}
        };
        const navigationExtras: NavigationExtras = {
          state: {
            origin: true
          }
        };

        this.router.navigateByUrl('home/publish/time-selector', navigationExtras);
      }
      if (this.destiny) {
        const travelData: TravelModel = this.travelService.travelData;
        travelData.destiny = {
          name: addressResult.name,
          destinyPostalCode: addressResult.addressData.postcode,
          destinyCoords: {lat: addressResult.lat, lng: addressResult.lon}
        };
        const navigationExtras: NavigationExtras = {
          state: {
            destiny: true
          }
        };
        this.router.navigateByUrl('home/publish/time-selector', navigationExtras);
      }
    })
  }

  flyTo(userCoords: Coordinates): void {
    if (userCoords.lat
    ) {
      console.warn(userCoords)
      this.leafletMap.flyTo([userCoords.lat, userCoords.lng], 16, {
        animate: true,
        duration: 1
      });
    }
  }

  getCurrentPosition(): void {
    this.locationService.getCurrentPosition().subscribe({
        next: (position) => {
          this.leafletMap.setView([position.coords.latitude, position.coords.longitude], this.zoom);
          this.flyTo({lat: position.coords.latitude, lng: position.coords.longitude});
        },
        error: (error) => {
          console.error('Error getting current position:', error);
        }
      }
    )
  }

  setCenter(centerPosition: Coordinates, zoom: number) {
    this.leafletMap.setView([centerPosition.lat, centerPosition.lng], zoom);
    this.leafletMap.whenReady(() => {
      setTimeout(() => {
        this.leafletMap.invalidateSize();
      }, 10);
    });
  }

  mapInit(centerPosition: Coordinates) {
    this.leafletMap = new L.Map('leafletMap')
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.leafletMap);
    this.leafletMap.setView([centerPosition.lat, centerPosition.lng], this.zoom);
    this.leafletMap.whenReady(() => {
      setTimeout(() => {
        this.leafletMap.invalidateSize();
      }, 10);
    });
  }

  watchPosition(): void {
    this.locationService.watchPosition().subscribe({
        next: (position) => {
          console.log('Updated Position:', position);
        },
        error: (error) => {
          console.error('Error watching position:', error);
        }
      }
    );
  }
}
