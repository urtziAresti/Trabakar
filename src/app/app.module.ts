import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule, HttpBackend, HttpClient} from '@angular/common/http'; // Import HttpClientModule

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAnalytics, provideAnalytics, ScreenTrackingService} from '@angular/fire/analytics';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {environment} from "../environments/environment";
import { provideAuth, getAuth } from '@angular/fire/auth';
import {getStorage, provideStorage, StorageModule} from "@angular/fire/storage";
import { GoBackDirective } from './directives/go-back.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {registerLocaleData} from "@angular/common";
// locales
import localeEs from '@angular/common/locales/es';
import localeEu from '@angular/common/locales/eu';
import { ServiceWorkerModule } from '@angular/service-worker';
registerLocaleData(localeEs);
registerLocaleData(localeEu);


export function HttpLoaderFactory(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent, GoBackDirective],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    StorageModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpBackend]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {

      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, ScreenTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
