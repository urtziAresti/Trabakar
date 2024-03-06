import {NgModule} from '@angular/core';
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
import {StorageModule} from "@angular/fire/storage";
import { GoBackDirective } from './directives/go-back.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {registerLocaleData} from "@angular/common";
// locales
import localeEs from '@angular/common/locales/es';
import localeEu from '@angular/common/locales/eu';
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
    StorageModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpBackend]
      }
    }),
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, ScreenTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
