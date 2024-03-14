import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OriginFinderPage } from './origin-finder.page';

const routes: Routes = [
  {
    path: '',
    component: OriginFinderPage
  },
  {
    path: 'origin-place-map',
    loadChildren: () => import('./map/origin-place.module').then(m => m.OriginPlacePageModule)
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
