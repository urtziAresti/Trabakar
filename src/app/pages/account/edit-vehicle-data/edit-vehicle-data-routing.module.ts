import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVehicleDataPage } from './edit-vehicle-data.page';

const routes: Routes = [
  {
    path: '',
    component: EditVehicleDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVehicleDataPageRoutingModule {}
