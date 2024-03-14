import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinyPlaceMapPage } from './destiny-place-map.page';

const routes: Routes = [
  {
    path: '',
    component: DestinyPlaceMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinyPlaceMapPageRoutingModule {}
