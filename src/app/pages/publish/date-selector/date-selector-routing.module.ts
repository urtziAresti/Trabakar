import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateSelectorPage } from './date-selector.page';

const routes: Routes = [
  {
    path: '',
    component: DateSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateSelectorPageRoutingModule {}
