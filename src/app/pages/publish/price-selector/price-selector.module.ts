import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceSelectorPageRoutingModule } from './price-selector-routing.module';

import { PriceSelectorPage } from './price-selector.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceSelectorPageRoutingModule,
    TranslateModule
  ],
  declarations: [PriceSelectorPage]
})
export class PriceSelectorPageModule {}
