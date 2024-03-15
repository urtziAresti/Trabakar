import {Component, OnInit, ViewChild} from '@angular/core';
import {IonPopover} from "@ionic/angular";
import {TravelPublisherService} from "../../../services/travel-publisher.service";
import {TravelModel} from "../../../models/travel-model";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-origin-departure-time',
  templateUrl: './origin-departure-time.page.html',
  styleUrls: ['./origin-departure-time.page.scss']
})
export class OriginDepartureTimePage implements OnInit {
  selectedHour: Date = new Date()
  showTimePicker: boolean = false;
  origin: boolean = false;
  destiny: boolean = false;
  @ViewChild('timePopover', {static: false}) timePopover!: IonPopover;

  constructor(
    private travelService: TravelPublisherService,
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
