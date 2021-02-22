import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';

//Our Imports
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { Constants } from '../../_helper/constants'

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.page.html',
  styleUrls: ['./user-services.page.scss'],
})
export class UserServicesPage implements OnInit {
  content: string;
	isLoggedIn = false;
	userId: string;
	contentVehicle = '';
  	sortHistory = [];
  
	constructor(private userService: UserService, 
		private route: Router, 
		public database: Constants, 
		private tokenStorage: TokenStorageService) {}
  

	ngOnInit(): void {
    this.database.checkIfCarsExist();
    this.database.serviceHistoryList();
		this.userService.getUserBoard().subscribe(data => {
			this.content = data;
			setTimeout(() => {
				this.isLoggedIn = true;
			}, 300);
		}, err => {
			this.content = JSON.parse(err.error).message;
		});
  }
  
	ionViewDidEnter() {
		setTimeout(() => {
			this.database.serviceHistoryList();
    }, 300);
		this.listUserServiceHistory();
  }
  
	listUserServiceHistory() {
		console.log('running user service function')
		if(this.database.historyList) {
      this.sortHistory = this.database.historyList;
      
			this.sortHistory.sort(function(a, b) {
				return new Date(b._id.Date).getTime() - new Date(a._id.Date).getTime()
			})
			console.log('Sorted array: ', this.sortHistory);
		}
  }
  
	goToVehicle() {
			this.route.navigate(['vehicle-register']);
    }
    
	//LogOut funtion 
	logOut() {
		this.tokenStorage.signOut();
	}
}