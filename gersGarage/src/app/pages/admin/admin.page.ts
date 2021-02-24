import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  content: string;
  isLoggedIn = false;

  constructor(private userService: UserService, 
    private route: Router, 
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;

        setTimeout(() => {
          this.isLoggedIn = true;
      }, 300);

        //this.isLoggedIn=true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  goToAdmin(){
    this.route.navigate(['menu']);
  }
}
