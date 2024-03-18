import {Component, OnInit} from '@angular/core';
import {TravelModel} from "../../../models/travel-model";
import {TravelService} from "../../../services/travel.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.page.html',
  styleUrls: ['./date-selector.page.scss'],
})
export class DateSelectorPage implements OnInit {
  selectedDates: Date[] = [];


  constructor(
    private travelService: TravelService,
    private router: Router) {
  }

  ngOnInit() {
  }


  nextPage() {
    const travelData: TravelModel = this.travelService.travelData;
    travelData.travelStartDates = this.selectedDates;
    console.warn(travelData)
    this.router.navigateByUrl('home/publish/available-seats')
  }

}
