import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatDetailPageRoutingModule } from './chat-detail-routing.module';

import { ChatDetailPage } from './chat-detail.page';
import {orderBy} from "@angular/fire/firestore";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatDetailPageRoutingModule,
        TranslateModule
    ],
  declarations: [ChatDetailPage]
})
export class ChatDetailPageModule {}
