import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { Constants } from '../../_helper/constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  content: string;
  isLoggedIn = false;

  start: String ='';
  defaultStartDate = new Date();
  defaultEndDate = new Date();
  end: String =  '';
  date: any[];
  bookingsExisted: Boolean;
  bookingData:[];
  sortHistory = [];


  constructor( 
    private userService: UserService,
    public database: Constants,
    private route: Router) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        this.isLoggedIn=true;
        this.loadBookings();
        this.database.getMechanicsList();
   
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  ionViewWillEnter(){
    //this.isLoggedIn = false;
    console.log('Permission flag:',this.isLoggedIn);
    this.setDefaultDates();
  }

  setDefaultDates(){
    this.defaultStartDate.setHours(0,0,0,0);
    this.defaultEndDate.setDate(this.defaultEndDate.getDate()+1);
    this.defaultEndDate.setHours(0,0,0,0);
    this.start = this.defaultStartDate.toISOString();
    this.end = this.defaultEndDate.toISOString();
    console.log('Start:', this.start)
    console.log('End:', this.end)
  }

  loadBookings(){
      this.userService.getServiceHistoryByDate(this.start,this.end).subscribe(data => {
      console.log('Bookings: ',data)
      this.bookingData= JSON.parse(data);
       if (data.length >= 1) {
        this.bookingsExisted = true
        this.listBookingDateHistory();
        //console.log(this.bookingsExisted)
    } else {
        this.bookingsExisted = false
    } 

  },
  err => {
      err.error;
      console.log(err.error);
      this.bookingsExisted = false
  }
);
  }

  bookingDetails(booking){
    console.log(booking);
    this.database.bookingDetails = booking;
    console.log('Booking details: ', this.database.bookingDetails);
    this.goToBookingDetails();
    
  }


  listBookingDateHistory() {
		console.log('running user service function')
		if(this.bookingsExisted) {
      this.sortHistory = this.bookingData;
      
			this.sortHistory.sort(function(a, b) {
				return new Date(a._id.Date).getTime() - new Date(b._id.Date).getTime()
			})
			console.log('Sorted array: ', this.sortHistory);
    }
    for(let i in this.sortHistory){
      if(!this.sortHistory[i]['_id'].Mechanic){
        this.sortHistory[i]['_id'].Mechanic = "Not Assigned Yet"
      }
    }
  }

  getDate(e) {
    let startDate = new Date(e.target.value).toISOString();
    let addDate = new Date(startDate);
    addDate.setDate(addDate.getDate() +1);
    let endDate = addDate.toISOString();
    this.start = startDate;
    this.end = endDate;
    console.log('Start date: ', this.start);
    console.log('End date: ', this.end);
  }

  confirmDate(){
    this.loadBookings()
  }

  goToBookingDetails() {
    this.route.navigate(['booking-details']);
  }

  


  goToAdmin(){
    this.route.navigate(['menu']);
  }
}
