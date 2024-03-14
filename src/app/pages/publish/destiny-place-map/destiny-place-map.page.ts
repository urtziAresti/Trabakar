import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Address} from "../../../interfaces/address";
import {LocationService} from "../../../services/location.service";
import {GeocodingService} from "../../../services/geocoding.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TravelPublisherService} from "../../../services/travel-publisher.service";
import {TravelModel} from "../../../models/travel-model";
import {Coordinates} from "../../../interfaces/Coordinates";
import * as L from "leaflet";

@Component({
  selector: 'app-destiny-place-map',
  templateUrl: './destiny-place-map.page.html',
  styleUrls: ['./destiny-place-map.page.scss'],
})
export class DestinyPlaceMapPage implements OnInit {

  leafletMap: any;
  zoom: number = environment.mapZoom
  selectedAddress!: Address;

  constructor(public locationService: LocationService,
              private geocodingService: GeocodingService,
              private route: ActivatedRoute,
              private router: Router,
              private travelService: TravelPublisherService) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(() => {
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
    this.geocodingService.getAddressFromLatLng(leafletCenter.lat, leafletCenter.lng).subscribe(addressResult => {

      const travelData: TravelModel = this.travelService.travelData;
      travelData.origin = {
        name: addressResult.name,
        originPostalCode: addressResult.addressData.postcode,
        originCoords: {lat: addressResult.lat, lng: addressResult.lon}
      };
      this.router.navigateByUrl('home/publish/travel-trail');
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
