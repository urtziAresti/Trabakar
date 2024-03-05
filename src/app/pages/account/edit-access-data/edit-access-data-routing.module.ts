import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccessDataPage } from './edit-access-data.page';

const routes: Routes = [
  {
    path: '',
    component: EditAccessDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAccessDataPageRoutingModule {}
