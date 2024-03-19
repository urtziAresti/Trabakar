import {Component, OnInit, ViewChild} from '@angular/core';
import {TravelService} from "../../services/travel.service";
import {IonPopover} from "@ionic/angular";

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
  showDatePicker: boolean = false;
  @ViewChild('timePopover', {static: false}) timePopover!: IonPopover;

  constructor(public travelService: TravelService) {
  }

  ngOnInit() {
  }

  onTimeSelected(value: CustomEvent) {
    this.selectedDateValue = new Date(value.detail.value);
  }

  openCalendar(){
    debugger
    this.showDatePicker = true;
    this.subscribeToPopoverDismissEvent();

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

  closeTimePicker() {
    if (this.showDatePicker) {
      this.showDatePicker = false;
    }
  }

}
