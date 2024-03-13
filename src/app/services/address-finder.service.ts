import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Address} from "../interfaces/address";
import {IAddress} from "../interfaces/IAddress";

@Injectable({
  providedIn: 'root'
})
export class AddressFinderService {

  constructor(private httpClient:HttpClient) { }


  findAddress(text: string): Observable<Address[]> {
    return this.httpClient.get<IAddress[]>(
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
            town: item.address.town,
            province: item.address.province,
            state: item.address.state,
            postcode: item.address.postcode,
            country: item.address.country,
            country_code: item.address.country_code
          },
          boundingbox: item.boundingbox
        }));
      })
    );
  }
}
