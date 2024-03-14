import {Component, OnInit, ViewChild} from '@angular/core';
import {IonPopover, PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-origin-departure-time',
  templateUrl: './origin-departure-time.page.html',
  styleUrls: ['./origin-departure-time.page.scss']
})
export class OriginDepartureTimePage implements OnInit {
  selectedHour: Date = new Date()
  showTimePicker: boolean = false;
  @ViewChild('timePopover', {static: false}) timePopover!: IonPopover;

  constructor() {
  }

  ngOnInit() {

  }

  subscribeToPopoverDismissEvent() {
    if (this.timePopover) {
      this.timePopover.onDidDismiss().then((data) => {
        if(data.role == 'backdrop'){
          this.closeTimePicker()
        }
      });
    }
  }

  onTimeSelected(value: CustomEvent) {
    this.selectedHour = new Date(value.detail.value);
    // this.closeTimePicker();
  }

  openTimePicker() {
    this.showTimePicker = true;
    this.subscribeToPopoverDismissEvent(); // Subscribe to popover events


  }

  closeTimePicker() {
    // Close the time picker only if it's open
    if (this.showTimePicker) {
      this.showTimePicker = false;
      // Close the popover using ViewChild reference
      if (this.timePopover) {
        this.timePopover.dismiss();
      }
    }
  }

}
