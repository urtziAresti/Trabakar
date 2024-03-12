import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private httpClient: HttpClient) {
  }

  getAddressFromLatLng(lat: number, lng: number) {
    return this.httpClient.get(
      'https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json')
  }
}
