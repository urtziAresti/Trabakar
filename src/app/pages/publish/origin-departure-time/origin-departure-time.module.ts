import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OriginDepartureTimePageRoutingModule } from './origin-departure-time-routing.module';

import { OriginDepartureTimePage } from './origin-departure-time.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OriginDepartureTimePageRoutingModule
  ],
  declarations: [OriginDepartureTimePage]
})
export class OriginDepartureTimePageModule {}
