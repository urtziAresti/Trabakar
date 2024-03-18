import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailableSeatsPage } from './available-seats.page';

const routes: Routes = [
  {
    path: '',
    component: AvailableSeatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailableSeatsPageRoutingModule {}
