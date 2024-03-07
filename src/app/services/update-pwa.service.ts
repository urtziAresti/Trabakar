import {Injectable} from '@angular/core';
import {MDCSnackbar} from '@material/snackbar';
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class UpdatePWAService {

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.checkForUpdate(); // Check for updates

    this.swUpdate.versionUpdates.subscribe(event => {
      // Handle available updates

      debugger
      console.warn(event)
      // console.log('New version available:', event.latestVersion.hash);
    });

    if (!this.swUpdate.isEnabled) {
      console.log('%c Update not enabled 🥺️', 'color:red');
    } else {
      console.log('%c Update enabled 😃', 'color:green');
    }
  }



}
