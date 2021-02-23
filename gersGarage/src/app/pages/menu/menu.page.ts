import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  //Array of page titles and routes
  pages = [
    {
      title: 'My Services',
      url: '/menu/user-services',
      icon: 'car'
    },
    {
      title: 'Make a booking',
      url: '/menu/bookings',
      icon: 'reader'
    },
    {
      title: 'Admin',
      url: '/menu/admin',
      icon: 'lock-closed'
    }
  ];

  options  = [ 
    {
      title: 'Profile',
      url: '/menu/profile',
      icon: 'person-circle'
    } 
    // {
    //   title: 'Logout',
    //   url: '/menu/login',
    //   icon: 'log-out'
    // }
  ];

  selectedPath = '';
  userData = [];

  constructor(private router: Router, private tokenStorage: TokenStorageService, private alertCtrl: AlertController,) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath=event.url;
    });
    //this.functions.logOut()
   }
  
  ngOnInit() {
    this.userData = this.tokenStorage.getUser();
    //console.log(this.tokenStorage.getUser());
  }

  //alert access tab 2
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
        header: 'Alert!',
        cssClass: 'my-custom-class',
        message: 'Are you sure you want to log out',
        buttons: ['No',{
            text: 'Yes',
            handler: () => {
              this.tokenStorage.signOut();
                //this.router.navigate(['/menu/user-services']);
               // console.log('Confirm Okay');
            }
        }],
        backdropDismiss: false
    });
    await alert.present();
}

  logOut(){
    this.presentAlertConfirm();
    //this.tokenStorage.signOut();
 }


  
  


}
