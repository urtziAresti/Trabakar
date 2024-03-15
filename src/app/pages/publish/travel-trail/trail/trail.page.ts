import { Component, OnInit } from '@angular/core';
import {TravelModel} from "../../../../models/travel-model";
import {TravelService} from "../../../../services/travel.service";

@Component({
  selector: 'app-trail',
  templateUrl: './trail.page.html',
  styleUrls: ['./trail.page.scss'],
})
export class TrailPage implements OnInit {

  constructor(private travelService:TravelService) { }

  ngOnInit() {

    const travelData : TravelModel = this.travelService.travelData;

    console.warn(travelData)
  }

}
