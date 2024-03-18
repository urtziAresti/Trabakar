import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DateSelectorPageRoutingModule} from './date-selector-routing.module';

import {DateSelectorPage} from './date-selector.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateSelectorPageRoutingModule,
    TranslateModule,
  ],
  declarations: [DateSelectorPage]
})
export class DateSelectorPageModule {
}
