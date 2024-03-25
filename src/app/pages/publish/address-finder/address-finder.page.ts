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
  results: Address[] = [];

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
            this.searchQuery = '';
          }
        } else {
          this.destiny = false;
          this.origin = true;
        }
      }
    )

  }

  filterAddress() {
    console.warn(this.searchQuery)
    if (this.searchQuery.length > 1) {
      this.adressFinder.findAddress(this.searchQuery).subscribe(addresses => {
        console.warn(addresses)
        this.results = addresses;
      })
    } else {
      this.results = [];
    }
  }

  openMap(resultAddress: Address | null) {
    if (this.origin) {
      const navigationExtras: NavigationExtras = {
        state: {
          originAddress: resultAddress,
          origin: true,
          destiny: false
        }
      };
      this.router.navigateByUrl('home/publish/map', navigationExtras);
    } else if (this.destiny) {
      const navigationExtras: NavigationExtras = {
        state: {
          destinyAddress: resultAddress,
          origin: false,
          destiny: true
        }
      };
      this.router.navigateByUrl('home/publish/map', navigationExtras);
    }
  }
}
