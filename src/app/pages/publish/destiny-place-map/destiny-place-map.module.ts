import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestinyPlaceMapPageRoutingModule } from './destiny-place-map-routing.module';

import { DestinyPlaceMapPage } from './destiny-place-map.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinyPlaceMapPageRoutingModule,
    TranslateModule
  ],
  declarations: [DestinyPlaceMapPage]
})
export class DestinyPlaceMapPageModule {}
