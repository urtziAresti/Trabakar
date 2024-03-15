import {Component, OnInit, ViewChild} from '@angular/core';
import {IonPopover} from "@ionic/angular";
import {TravelService} from "../../../services/travel.service";
import {TravelModel} from "../../../models/travel-model";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector-time.page.html',
  styleUrls: ['./time-selector-time.page.scss']
})
export class TimeSelectorTimePage implements OnInit {
  selectedHour: Date = new Date()
  showTimePicker: boolean = false;
  origin: boolean = false;
  destiny: boolean = false;
  @ViewChild('timePopover', {static: false}) timePopover!: IonPopover;

  constructor(
    private travelService: TravelService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
        const currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation && currentNavigation.extras?.state) {
          if (currentNavigation.extras.state['origin']) {
            this.origin = true;
            this.destiny = false;
          } else if (currentNavigation.extras.state['destiny']) {
            this.destiny = true;
            this.origin = false
          }
        }
      }
    )
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

    if (this.origin) {
      travelData.origin = {
        departureTime: this.selectedHour,
        ...travelData.origin
      };
      const navigationExtras: NavigationExtras = {
        state: {
          destiny: true
        }
      };
      this.router.navigateByUrl('home/publish', navigationExtras);

    } else if(this.destiny) {
      travelData.destiny = {
        expectedArrivalTime : this.selectedHour,
        ...travelData.destiny
      };
      console.warn(travelData)
      this.router.navigateByUrl('home/publish/trail');


    }




  }

}
