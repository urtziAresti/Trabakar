import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OriginPlaceMap } from './origin-place-map.page';

const routes: Routes = [
  {
    path: '',
    component: OriginPlaceMap
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPageRoutingModule {}
