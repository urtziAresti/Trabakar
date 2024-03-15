import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSelectorTimePage } from './time-selector-time.page';

const routes: Routes = [
  {
    path: '',
    component: TimeSelectorTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OriginDepartureTimePageRoutingModule {}
