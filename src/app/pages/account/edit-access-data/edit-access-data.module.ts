import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccessDataPageRoutingModule } from './edit-access-data-routing.module';

import { EditAccessDataPage } from './edit-access-data.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditAccessDataPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [EditAccessDataPage]
})
export class EditAccessDataPageModule {}
