import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../interfaces/address";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private httpClient: HttpClient) {
  }

  getAddressFromLatLng(lat: number, lng: number) : Observable<Address> {
    return this.httpClient.get<Address>(
      'https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json')
  }

}
