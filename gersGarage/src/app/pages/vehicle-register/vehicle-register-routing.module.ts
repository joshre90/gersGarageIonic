import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleRegisterPage } from './vehicle-register.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRegisterPageRoutingModule {}
