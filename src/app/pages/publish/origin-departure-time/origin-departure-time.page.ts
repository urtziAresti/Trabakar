import {Component, OnInit, ViewChild} from '@angular/core';
import {IonPopover} from "@ionic/angular";
import {TravelPublisherService} from "../../../services/travel-publisher.service";
import {TravelModel} from "../../../models/travel-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-origin-departure-time',
  templateUrl: './origin-departure-time.page.html',
  styleUrls: ['./origin-departure-time.page.scss']
})
export class OriginDepartureTimePage implements OnInit {
  selectedHour: Date = new Date()
  showTimePicker: boolean = false;
  @ViewChild('timePopover', {static: false}) timePopover!: IonPopover;

  constructor(
    private travelService: TravelPublisherService,
    private router: Router) {
  }

  ngOnInit() {

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

  onTimeSelected(value: CustomEvent) {
    this.selectedHour = new Date(value.detail.value);
    // this.closeTimePicker();
  }

  openTimePicker() {
    this.showTimePicker = true;
    this.subscribeToPopoverDismissEvent();
  }

  closeTimePicker() {
    // Close the time picker only if it's open
    if (this.showTimePicker) {
      this.showTimePicker = false;

    }
  }

  nextPage() {
    const travelData: TravelModel = this.travelService.travelData;
    travelData.origin = {
      departureTime: this.selectedHour,
      ...travelData.origin
    };
    this.router.navigateByUrl('home/publish/destiny-finder');

  }

}
