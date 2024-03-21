import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelDetailPageRoutingModule } from './travel-detail-routing.module';

import { TravelDetailPage } from './travel-detail.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TravelDetailPageRoutingModule,
        TranslateModule
    ],
  declarations: [TravelDetailPage]
})
export class TravelDetailPageModule {}
