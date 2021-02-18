import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.page.html',
  styleUrls: ['./user-services.page.scss'],
})
export class UserServicesPage implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }


  logOut(){
    this.tokenStorage.signOut();
    //isCar=true;
  }

}
