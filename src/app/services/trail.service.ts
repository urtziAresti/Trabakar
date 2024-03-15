import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Coordinates} from "../interfaces/Coordinates";
import {Observable} from "rxjs";
import {Route, RouteData} from "../interfaces/route";

@Injectable({
  providedIn: 'root'
})
export class TrailService {
  // http://router.project-osrm.org/route/v1/car/-3.199353,43.190913;-3.138442,43.211713?alternatives=true&steps=true&geometries=geojson&overview=full&annotations=true
  constructor(private httpClient: HttpClient) {
  }

  getRouteTrail(originCoords: Coordinates, destinyCoords: Coordinates) : Observable<RouteData> {
    return this.httpClient.get<RouteData>('http://router.project-osrm.org/route/v1/car/' + originCoords.lng + ',' + originCoords.lat +
      ';' + destinyCoords.lng + ',' + destinyCoords.lat +
      '?alternatives=false&steps=true&geometries=geojson&overview=full&annotations=false')
  }
}
