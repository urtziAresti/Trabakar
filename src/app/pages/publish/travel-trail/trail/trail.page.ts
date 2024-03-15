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

    if(travelData.origin?.originCoords && travelData.destiny?.destinyCoords){
      this.trailService.getRouteTrail(travelData.origin.originCoords,travelData.destiny.destinyCoords).subscribe(res => {
        console.warn(res)
      })

    }

  }

}
