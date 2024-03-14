import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OriginFinderPage } from './origin-finder.page';

const routes: Routes = [
  {
    path: '',
    component: OriginFinderPage
  },
  {
    path: 'map',
    loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
  },
  {
    path: 'origin-departure-time',
    loadChildren: () => import('../origin-departure-time/origin-departure-time.module').then(m => m.OriginDepartureTimePageModule)
  },
  {
    path: 'destiny-finder',
    loadChildren: () => import('../destiny-finder/destiny-finder.module').then( m => m.DestinyFinderPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishPageRoutingModule {}
