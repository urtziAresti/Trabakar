import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Route} from "../../../interfaces/route";
import {Travel} from "../../../interfaces/travel";

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.page.html',
  styleUrls: ['./travel-detail.page.scss'],
})
export class TravelDetailPage implements OnInit {

  travelData!: Travel;
  seatsToReserve : number = 0

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(() => {
        const currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation && currentNavigation.extras?.state) {
          if (currentNavigation.extras.state['travelData'] && currentNavigation.extras.state['passengersNumber'] ) {
            this.travelData = currentNavigation.extras.state['travelData'] as Travel;
            this.seatsToReserve = currentNavigation.extras.state['passengersNumber'];
            console.warn(this.travelData)
          }
        }
      }
    )
  }

  openChatWithTravelPublisher(){

  }


}
