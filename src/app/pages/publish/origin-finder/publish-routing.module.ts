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
    loadChildren: () => import('../origin-place-map/origin-place.module').then(m => m.OriginPlacePageModule)
  },
  {
    path: 'origin-departure-time',
    loadChildren: () => import('../origin-departure-time/origin-departure-time.module').then(m => m.OriginDepartureTimePageModule)
  },
  {
    path: 'destiny-finder',
    loadChildren: () => import('../destiny-finder/destiny-finder.module').then( m => m.DestinyFinderPageModule)
  },
  {
    path: 'destiny-place-map',
    loadChildren: () => import('../destiny-place-map/destiny-place-map.module').then( m => m.DestinyPlaceMapPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishPageRoutingModule {}
