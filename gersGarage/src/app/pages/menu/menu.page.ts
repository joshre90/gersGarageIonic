import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';

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

  constructor(private router: Router, private tokenStorage: TokenStorageService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath=event.url;
    });
    //this.functions.logOut()
   }
  
  ngOnInit() {
  }

  logOut(){
    this.tokenStorage.signOut();
 }


  
  


}
