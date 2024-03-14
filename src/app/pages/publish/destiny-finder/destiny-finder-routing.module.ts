import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinyFinderPage } from './destiny-finder.page';

const routes: Routes = [
  {
    path: '',
    component: DestinyFinderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinyFinderPageRoutingModule {}
