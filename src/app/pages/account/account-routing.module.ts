import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'edit-access-data',
    loadChildren: () => import('./edit-access-data/edit-access-data.module').then( m => m.EditAccessDataPageModule)
  },
  {
    path: 'edit-vehicle-data',
    loadChildren: () => import('./edit-vehicle-data/edit-vehicle-data.module').then( m => m.EditVehicleDataPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
