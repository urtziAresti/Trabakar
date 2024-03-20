import {Component, OnInit, ViewChild} from '@angular/core';
import {TravelService} from "../../services/travel.service";
import {IonPopover} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  originSearchQuery: string = ''
  destinySearchQuery: string = ''
  selectedDateValue: Date = new Date();
  todayDateValue: Date = new Date();
  showDatePicker: boolean = false;
  showSeatsSelector: boolean = false;
  seatsToFind: number = 1;
  @ViewChild('timePopover', {static: false}) timePopover!: IonPopover;
  @ViewChild('seatsPopover', {static: false}) seatsPopover!: IonPopover;


  constructor(public travelService: TravelService,
              private router: Router) {
  }

  ngOnInit() {
  }


  onTimeSelected(value: CustomEvent) {
    this.selectedDateValue = new Date(value.detail.value);
  }

  openCalendar() {
    this.showDatePicker = true;
    this.subscribeToPopoverDismissEvent();

  }

  openSeatsSelector() {
    this.showSeatsSelector = true;
    this.subscribeToSeatsPopoverDismissEvent();
  }

  subscribeToPopoverDismissEvent() {
    if (this.timePopover) {
      this.timePopover.onDidDismiss().then((data) => {
        if (data.role == 'backdrop') {
          this.closeTimePicker()
        }
      });
    }
  }

  subscribeToSeatsPopoverDismissEvent() {
    if (this.seatsPopover) {
      this.seatsPopover.onDidDismiss().then((data) => {
        if (data.role == 'backdrop') {
          this.closeSeatsPicker()
        }
      });
    }
  }

  closeTimePicker() {
    if (this.showDatePicker) {
      this.showDatePicker = false;
    }
  }

  closeSeatsPicker() {
    if (this.showSeatsSelector) {
      this.showSeatsSelector = false;
    }
  }

  addSeat() {
    this.seatsToFind++;
  }

  removeSeat() {
    this.seatsToFind--;
  }

  openTravel() {
    this.router.navigateByUrl('/home/search/travel-detail')
  }

}
