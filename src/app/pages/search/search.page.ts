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

  constructor(private travelService: TravelService) {
  }

  ngOnInit() {

    // this.getAllTravels()
  }

  getAllTravels() {
    this.travelService.getAllTravels().subscribe(allTravels => {
      console.warn(allTravels)
      this.travels = allTravels;
    })
  }

}
