import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserServicesPageRoutingModule } from './user-services-routing.module';

import { UserServicesPage } from './user-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserServicesPageRoutingModule
  ],
  declarations: [UserServicesPage]
})
export class UserServicesPageModule {}
