import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishPage } from './publish.page';

const routes: Routes = [
  {
    path: '',
    component: PublishPage
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'origin-departure-time',
    loadChildren: () => import('./origin-departure-time/origin-departure-time.module').then( m => m.OriginDepartureTimePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishPageRoutingModule {}
