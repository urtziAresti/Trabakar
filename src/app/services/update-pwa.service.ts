import {Injectable} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";
import {tap} from "rxjs";
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class UpdatePWAService {

  constructor(private swUpdate: SwUpdate,
              private alertController: AlertController) {

    this.swUpdate.checkForUpdate().then(res => {
      console.warn('check update', res)
    })


    this.swUpdate.versionUpdates.pipe(
      tap(update => {

        if (!this.swUpdate.isEnabled) {
          console.log('%c Update not enabled 🥺️', 'color:red');
        } else {
          console.log('%c Update enabled 😃', 'color:green');
        }


        if (update.type === 'VERSION_DETECTED') {
          // activateUpdate() will trigger the 'VERSION_READY' or 'VERSION_INSTALLATION_FAILED' event when done
          console.log('New server version detected, trying to install...');
          // todo
          this.showUpdateAlert()
        }
        if (update.type === 'VERSION_READY') {
          // this._reloadPage will be set to true, asking a full page reload on next navigation
          console.log('New server version installed');
        }
        if (update.type === 'VERSION_INSTALLATION_FAILED') {
          // this._clearCacheAndReload will be set to true, asking a cache clear and full page reload on next navigation
          console.warn('Error while installing update, cache will be cleared and page reloaded');
        }
        // another event type possible is 'NO_NEW_VERSION_DETECTED', we don't need to handle it
      })
    ).subscribe();
  }


  async showUpdateAlert() {
    const alert = await this.alertController.create({
      header:"UPDATE",
      message:'Tienes una nueva actualizacion !!! ',
      buttons: ['OK']
    });
    await alert.present();
    alert.onDidDismiss().then(res => {
      this.swUpdate.activateUpdate().then()
    })
  }

}
