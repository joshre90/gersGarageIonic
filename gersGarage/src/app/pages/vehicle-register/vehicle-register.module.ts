import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleRegisterPageRoutingModule } from './vehicle-register-routing.module';

import { VehicleRegisterPage } from './vehicle-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleRegisterPageRoutingModule
  ],
  declarations: [VehicleRegisterPage]
})
export class VehicleRegisterPageModule {}
