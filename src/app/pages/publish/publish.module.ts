import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishPageRoutingModule } from './publish-routing.module';

import { PublishPage } from './publish.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PublishPageRoutingModule,
        TranslateModule
    ],
  declarations: [PublishPage]
})
export class PublishPageModule {}
