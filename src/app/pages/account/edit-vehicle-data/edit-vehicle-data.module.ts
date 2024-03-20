import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditVehicleDataPageRoutingModule } from './edit-vehicle-data-routing.module';

import { EditVehicleDataPage } from './edit-vehicle-data.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditVehicleDataPageRoutingModule,
        TranslateModule
    ],
  declarations: [EditVehicleDataPage]
})
export class EditVehicleDataPageModule {}
