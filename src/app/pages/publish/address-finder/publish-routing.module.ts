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
  },
  {
    path: 'date-selector',
    loadChildren: () => import('../date-selector/date-selector.module').then( m => m.DateSelectorPageModule)
  },
  {
    path: 'available-seats',
    loadChildren: () => import('../available-seats/available-seats.module').then( m => m.AvailableSeatsPageModule)
  },
  {
    path: 'price-selector',
    loadChildren: () => import('../price-selector/price-selector.module').then( m => m.PriceSelectorPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishPageRoutingModule {
}
