import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OriginDepartureTimePage } from './origin-departure-time.page';

const routes: Routes = [
  {
    path: '',
    component: OriginDepartureTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OriginDepartureTimePageRoutingModule {}
