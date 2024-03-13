import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Address} from "../interfaces/address";

@Injectable({
  providedIn: 'root'
})
export class AddressFinderService {

  constructor(private httpClient:HttpClient) { }


  findAddress(text: string): Observable<Address[]> {
    return this.httpClient.get<Address[]>(
      `https://nominatim.openstreetmap.org/search.php?q=${text}&addressdetails=1&format=jsonv2&limit=3`
    ).pipe(
      map(res => {
        return res.map(item => ({
          place_id: item.place_id,
          licence: item.licence,
          osm_type: item.osm_type,
          osm_id: item.osm_id,
          lat:item.lat,
          lon:item.lon,
          category: item.category,
          type: item.type,
          place_rank: item.place_rank,
          importance: item.importance,
          addresstype: item.addresstype,
          name: item.name,
          display_name: item.display_name,
          addressData: {
            town: item.addressData.town,
            province: item.addressData.province,
            state: item.addressData.state,
            postcode: item.addressData.postcode,
            country: item.addressData.country,
            country_code: item.addressData.country_code
          },
          boundingbox: item.boundingbox
        }));
      })
    );
  }
}
