import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../../services/location.service";
import {GeocodingService} from "../../../services/geocoding.service";
import * as L from "leaflet";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../interfaces/address";
import {Coordinates} from "../../../interfaces/Coordinates";
import {Auth} from "@angular/fire/auth";
import {Md5} from "ts-md5";
import {TravelPublisherService} from "../../../services/travel-publisher.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  leafletMap: any;
  zoom: number = environment.mapZoom
  selectedAddress!: Address;

  constructor(public locationService: LocationService,
              private geocodingService: GeocodingService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: Auth,
              private travelService:TravelPublisherService) {


  }

  generateTravelID() {
    return Md5.hashStr(new Date().toString());

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        const currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation && currentNavigation.extras?.state) {
          if (currentNavigation.extras.state['address']) {
            this.selectedAddress = currentNavigation.extras.state['address'] as Address;
            this.mapInit({lat: this.selectedAddress.lat, lng: this.selectedAddress.lon})
          } else {
            this.mapInit({lat: environment.defaultPosition.latitude, lng: environment.defaultPosition.lontitude})
          }
        }
      }
    )
  }

  setPosition() {
    const leafletCenter = this.leafletMap.getCenter();
    this.geocodingService.getAddressFromLatLng(leafletCenter.lat, leafletCenter.lng).subscribe(adressResult => {
      console.error(this.travelService.travelData)

      // this.travelService.travelData.origin?.name = adressResult.name;
      // this.travelService.travelData.origin.originPostalCode = adressResult.addressData.postcode;
      // this.travelService.travelData.origin.originCoords = {lat: adressResult.lat, lng:adressResult.lon}


      // this.router.navigateByUrl('')
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
    this.locationService.getCurrentPosition().subscribe(
      (position) => {
        this.leafletMap.setView([position.coords.latitude, position.coords.longitude], this.zoom);
        this.flyTo({lat: position.coords.latitude, lng: position.coords.longitude})
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
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
    this.locationService.watchPosition().subscribe(
      (position) => {
        console.log('Updated Position:', position);
      },
      (error) => {
        console.error('Error watching position:', error);
        // Handle error
      }
    );
  }
}
