import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PublishPageRoutingModule} from './publish-routing.module';

import {AddressFinderPage} from './address-finder.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddressFinderPage]
})
export class OriginFinderPageModule {
}
