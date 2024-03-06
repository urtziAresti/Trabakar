import {Directive, HostListener} from '@angular/core';
import {NavController} from "@ionic/angular";

@Directive({
  selector: '[appGoBack]'
})
export class GoBackDirective {

  constructor(private nav: NavController) {
  }
  @HostListener(
    'click', ['$event']) clickEvent(): void {
    this.nav.back()
  }


}
