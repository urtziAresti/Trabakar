import {Component, OnInit} from '@angular/core';
import {AddressFinderService} from "../../../services/address-finder.service";
import {Address} from "../../../interfaces/address";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-publish',
  templateUrl: './origin-finder.page.html',
  styleUrls: ['./origin-finder.page.scss'],
})
export class OriginFinderPage implements OnInit {
  searchQuery: string = '';
  results: Address[] = [
    {
      "place_id": 282802195,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 341908,
      "lat": 43.1940413,
      "lon": -3.1945492,
      "category": "boundary",
      "type": "administrative",
      "place_rank": 16,
      "importance": 0.4778744230054683,
      "addresstype": "town",
      "name": "Valmaseda",
      "display_name": "Valmaseda, Vizcaya, País Vasco, 48800, España",
      "addressData": {
        "town": "Valmaseda",
        "province": "Vizcaya",
        "state": "País Vasco",
        "postcode": "48800",
        "country": "España",
        "country_code": "es"
      },
      "boundingbox": [
        "43.1691916",
        "43.2191916",
        "-3.2532734",
        "-3.1782400"
      ]
    }
  ];

  constructor(private adressFinder: AddressFinderService,
              private router: Router) {
  }

  ngOnInit() {

  }

  openMap(resultAddress: Address | null) {

    const navigationExtras: NavigationExtras = {
      state: {
        address: resultAddress
      }
    };
    this.router.navigateByUrl('home/publish/origin-place-map', navigationExtras);
  }


}
