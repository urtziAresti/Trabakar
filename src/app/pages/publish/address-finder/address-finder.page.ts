import {Component, OnInit} from '@angular/core';
import {AddressFinderService} from "../../../services/address-finder.service";
import {Address} from "../../../interfaces/address";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-publish',
  templateUrl: './address-finder.page.html',
  styleUrls: ['./address-finder.page.scss'],
})
export class AddressFinderPage implements OnInit {
  searchQuery: string = '';
  origin: boolean = false
  destiny: boolean = true;
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
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(() => {
        const currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation && currentNavigation.extras?.state) {
          if (currentNavigation.extras.state['destiny']) {
            this.destiny = true;
            this.origin = false;
          }
        } else {
          this.destiny = false;
          this.origin = true;
        }
      }
    )

  }

  openMap(resultAddress: Address | null) {
    if (this.origin) {
      const navigationExtras: NavigationExtras = {
        state: {
          originAddress: resultAddress
        }
      };
      this.router.navigateByUrl('home/publish/map', navigationExtras);
    } else if (this.destiny) {
      const navigationExtras: NavigationExtras = {
        state: {
          destinyAddress: resultAddress
        }
      };
      this.router.navigateByUrl('home/publish/map', navigationExtras);
    }
  }
}
