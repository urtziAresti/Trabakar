import {Component, OnInit} from '@angular/core';
import {TravelModel} from "../../../models/travel-model";
import {TravelService} from "../../../services/travel.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-price-selector',
  templateUrl: './price-selector.page.html',
  styleUrls: ['./price-selector.page.scss'],
})
export class PriceSelectorPage implements OnInit {
  estimatedPrice: number = 1;
  travelComments : string ='';

  constructor(private travelService: TravelService,
              private router: Router) {
  }

  ngOnInit() {
  }

  addEur() {
    this.estimatedPrice++;
  }

  removeEur() {
    this.estimatedPrice--;
  }

  nextPage() {

    const travelData: TravelModel = this.travelService.travelData;
    travelData.estimatedPrice = this.estimatedPrice;
    travelData.comments = this.travelComments;
    this.travelService.publisTravel().then(() => {
      this.router.navigateByUrl('home/publish')
    }).catch(err => {
      console.error(err)
    })
  }

}
