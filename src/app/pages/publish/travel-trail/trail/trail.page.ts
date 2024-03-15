import {Component, OnInit} from '@angular/core';
import {TravelModel} from "../../../../models/travel-model";
import {TravelService} from "../../../../services/travel.service";
import {TrailService} from "../../../../services/trail.service";

@Component({
  selector: 'app-trail',
  templateUrl: './trail.page.html',
  styleUrls: ['./trail.page.scss'],
})
export class TrailPage implements OnInit {

  constructor(
    private travelService: TravelService,
    private trailService: TrailService
  ) {
  }

  ngOnInit() {
    const travelData: TravelModel = this.travelService.travelData;
    console.warn(travelData)

    if (travelData.origin?.originCoords && travelData.destiny?.destinyCoords) {
      this.trailService.getRouteTrail(travelData.origin.originCoords, travelData.destiny.destinyCoords).subscribe(res => {
        console.warn(res)
      })

    } else {
      const mockedTravelData: TravelModel = this.travelService.travelData;
      mockedTravelData.origin = {
        originCoords: {lat: 43.190913, lng: -3.199353}
      }
      mockedTravelData.destiny = {
        destinyCoords: {lat: 43.211713, lng: -3.138442}
      }
      if (mockedTravelData.origin?.originCoords && mockedTravelData.destiny?.destinyCoords)
        this.trailService.getRouteTrail(mockedTravelData.origin.originCoords, mockedTravelData.destiny.destinyCoords).subscribe(res => {
          console.warn(res)
        })
    }
  }

}
