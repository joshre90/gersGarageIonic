import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

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

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath=event.url;
    });
   }
  
  ngOnInit() {
  }

}
