import {Component, OnInit} from '@angular/core';
import {TravelService} from "../../services/travel.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  originSearchQuery:string = ''
  destinySearchQuery:string = ''
  selectedDateValue : Date = new Date();
  todayDateValue : Date = new Date();

  constructor(public travelService: TravelService) {
  }

  ngOnInit() {
  }
}
