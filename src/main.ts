import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {defineCustomElements} from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

defineCustomElements(window)
  .catch(err => console.error(err))
const myData = localStorage.getItem('TRABACAR__LOCALE');

if (environment.production) {
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker.register('ngsw-worker.js')
      .then(registration => {
        console.log('Angular ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.error('Angular ServiceWorker registration failed: ', err);
      });

    navigator.serviceWorker.register('./assets/sw.js')
      .then(registration => {
        console.log('Custom Service registration successful with scope: ', registration.scope);




      })
      .catch(err => {
        console.error('Custom ServiceWorker registration failed: ', err);
      });
  }
} else {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./assets/sw.js')
      .then(registration => {
        console.log('Custom Service registration assets successful with scope: ', registration.scope);
        if (registration.active) {
          registration.active.postMessage({ action: 'getLocalStorage', data: myData });
        }
      })
      .catch(err => {
        console.error('Custom ServiceWorker assets registration failed: ', err);
      });

  }

}






