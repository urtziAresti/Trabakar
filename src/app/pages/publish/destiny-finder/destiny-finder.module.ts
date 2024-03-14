import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestinyFinderPageRoutingModule } from './destiny-finder-routing.module';

import { DestinyFinderPage } from './destiny-finder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinyFinderPageRoutingModule
  ],
  declarations: [DestinyFinderPage]
})
export class DestinyFinderPageModule {}
