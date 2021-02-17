import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
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
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      }


    ]
  },
  {
    path:'',
    redirectTo:'/menu/user-services'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
