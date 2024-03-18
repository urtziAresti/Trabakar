import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-available-seats',
  templateUrl: './available-seats.page.html',
  styleUrls: ['./available-seats.page.scss'],
})
export class AvailableSeatsPage implements OnInit {
  availableSeats: number = 3;

  constructor() {
  }

  ngOnInit() {
  }

  addSeat() {
    this.availableSeats++;
  }

  removeSeat() {
    this.availableSeats--;
  }

  nextPage(){

  }

}
