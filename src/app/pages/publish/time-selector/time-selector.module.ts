import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OriginDepartureTimePageRoutingModule } from './time-selector-routing.module';

import { TimeSelectorTimePage } from './time-selector-time.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OriginDepartureTimePageRoutingModule
  ],
  declarations: [TimeSelectorTimePage]
})
export class OriginDepartureTimePageModule {}
