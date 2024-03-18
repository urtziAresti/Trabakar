import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailableSeatsPageRoutingModule } from './available-seats-routing.module';

import { AvailableSeatsPage } from './available-seats.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailableSeatsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AvailableSeatsPage]
})
export class AvailableSeatsPageModule {}
