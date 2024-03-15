import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddressFinderPage} from './address-finder.page';

const routes: Routes = [
  {
    path: '',
    component: AddressFinderPage
  },
  {
    path: 'map',
    loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
  },
  {
    path: 'time-selector',
    loadChildren: () => import('../time-selector/time-selector.module').then(m => m.OriginDepartureTimePageModule)
  },
  {
    path: 'trail',
    loadChildren: () => import('../travel-trail/trail/trail.module').then(m => m.TrailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishPageRoutingModule {
}
