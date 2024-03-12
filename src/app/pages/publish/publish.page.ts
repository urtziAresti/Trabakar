import {Component, OnInit} from '@angular/core';
import * as L from "leaflet"
import {LocationService} from "../../services/location.service";
import {Coordinates} from "../../interfaces/Coordinates";
import {environment} from "../../../environments/environment";
import {PointExpression} from "leaflet";

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
  leafletMap: any;
  zoom: number = 13

  constructor(public locationService: LocationService) {
  }

  ngOnInit() {
    this.mapInit()
    this.getCurrentPosition();
    this.watchPosition();
  }

  setPosition(){
    console.warn(this.leafletMap.getCenter())
  }

  flyTo(userCoords: GeolocationCoordinates): void {
    console.warn(userCoords.latitude)
    if(userCoords)
    this.leafletMap.flyTo([userCoords.latitude, userCoords.longitude], 16, {
      animate: true,
      duration: 1
    });
  }

  getCurrentPosition(): void {
    this.locationService.getCurrentPosition().subscribe(
      (position) => {
        this.leafletMap.setView([position.coords.latitude, position.coords.longitude], this.zoom);
        this.flyTo(position.coords)
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }

  mapInit() {
    this.leafletMap = new L.Map('leafletMap')
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.leafletMap);
    this.leafletMap.setView([environment.defaultPosition.latitude, environment.defaultPosition.lontitude], this.zoom);
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
