import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

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


@NgModule({
  declarations: [AppComponent, GoBackDirective],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    StorageModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, ScreenTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
