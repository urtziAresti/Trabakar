import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Address} from "../interfaces/address";
import {IAddress} from "../interfaces/IAddress";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private httpClient: HttpClient) {
  }

  getAddressFromLatLng(lat: number, lng: number): Observable<Address> {
    return this.httpClient.get<IAddress>(
      'https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json').pipe(
      map(res => {
        const item = res; // Assuming the first result is what you want
        return {
          place_id: item.place_id,
          licence: item.licence,
          osm_type: item.osm_type,
          osm_id: item.osm_id,
          lat: item.lat,
          lon: item.lon,
          category: item.category,
          type: item.type,
          place_rank: item.place_rank,
          importance: item.importance,
          addresstype: item.addresstype,
          name: item.name,
          display_name: item.display_name,
          addressData: {
            town: item.address.town,
            province: item.address.province,
            state: item.address.state,
            postcode: item.address.postcode,
            country: item.address.country,
            country_code: item.address.country_code
          },
          boundingbox: item.boundingbox
        }
      })
    );
  }

}
