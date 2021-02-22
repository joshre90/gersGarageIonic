import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      {
        path: 'user-services',
        loadChildren: () => import('../user-services/user-services.module').then( m => m.UserServicesPageModule)
      },
      {
        path: 'bookings',
        loadChildren: () => import('../bookings/bookings.module').then( m => m.BookingsPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
      },

      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path:'',
        redirectTo:'/menu/user-services',
        pathMatch: 'full'
      }
    ]
  },
  /* {
    path:'',
    redirectTo:'/menu/user-services',
    pathMatch: 'full'
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
