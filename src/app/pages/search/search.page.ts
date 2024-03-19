import {Component, OnInit} from '@angular/core';
import {Travel} from "../../interfaces/travel";
import {TravelService} from "../../services/travel.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  travels: Travel[] = [];
  originSearchQuery:string = ''
  destinySearchQuery:string = ''
  selectedDateValue : Date = new Date();
  todayDateValue : Date = new Date();

  constructor(public travelService: TravelService) {
  }

  ngOnInit() {
    this.travelService.allTravels.subscribe(allTravels => {
      console.warn(allTravels)
      this.travels = allTravels;


    })


    // this.travelService.filterTravelsByOrigin$("del palacio").subscribe(res => {
    //   console.warn(res)
    // })
  }
}
