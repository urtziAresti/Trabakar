import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Travel} from "../../../interfaces/travel";
import {Auth} from "@angular/fire/auth";
import {TravelService} from "../../../services/travel.service";

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.page.html',
  styleUrls: ['./travel-detail.page.scss'],
})
export class TravelDetailPage implements OnInit {

  travelData!: Travel;
  seatsToReserve: number = 0
   user = this.auth.currentUser;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: Auth,
              private travelService:TravelService) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(() => {
        const currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation && currentNavigation.extras?.state) {
          if (currentNavigation.extras.state['travelData'] && currentNavigation.extras.state['passengersNumber']) {
            this.travelData = currentNavigation.extras.state['travelData'] as Travel;
            this.seatsToReserve = currentNavigation.extras.state['passengersNumber'];
            console.warn(this.travelData)
          }
        }
      }
    )
  }

  openChatWithTravelPublisher() {
    this.travelService.setCurrentUserUIDtoselectedTravel(this.travelData.travelID)
    const navigationExtras: NavigationExtras = {
      state: {
        destinataryUser: this.travelData.userID,
        travelData:this.travelData
      }
    };
    this.router.navigateByUrl('home/chat/chat-detail', navigationExtras);
  }


}
