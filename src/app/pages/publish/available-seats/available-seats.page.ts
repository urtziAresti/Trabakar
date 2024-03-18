import {Component, OnInit} from '@angular/core';
import {TravelModel} from "../../../models/travel-model";
import {TravelService} from "../../../services/travel.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-available-seats',
  templateUrl: './available-seats.page.html',
  styleUrls: ['./available-seats.page.scss'],
})
export class AvailableSeatsPage implements OnInit {
  availableSeats: number = 3;

  constructor(
    private travelService: TravelService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  addSeat() {
    this.availableSeats++;
  }

  removeSeat() {
    this.availableSeats--;
  }

  nextPage() {
    const travelData: TravelModel = this.travelService.travelData;
    travelData.numberOfSeatsAvailable = this.availableSeats;
    // store all travel
    this.router.navigateByUrl('home/publish/price-selector')

  }

}
