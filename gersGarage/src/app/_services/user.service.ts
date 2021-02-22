import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ids = '5ffe3ce68c8c81fd078df20a';
 
  constructor(private http: HttpClient) { }

  //Test addresses
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/admin', { responseType: 'text' });
  }


  ///////////GETS/////////////
  //Function to get the list of engine types
  getEngineList(): Observable<any> {
        return this.http.get(API_URL + 'user/engine', { responseType: 'text' });
      }

  //Function to get the list of vehicle makes
  getMakeList(): Observable<any> {
        return this.http.get(API_URL + 'user/makes', { responseType: 'text' });
      }
  
  //Function to get the vehicle type list
  getVehicleTypeList(): Observable<any> {
        return this.http.get(API_URL + 'user/vehicle-type', { responseType: 'text' });
      }

  //Function to get the type of service
  getServiceType():Observable<any> {
        return this.http.get(API_URL + 'user/service-type', { responseType: 'text' });
  }

  //Function to get the list of vehicles registered by a particular user
  getUserVehicleList(id): Observable<any> {
    return this.http.get(`${API_URL}user/vehicle-list/${id}`, { responseType: 'text' });
  }

  //Function to get the list of services of a particular user
  getServiceHistory(id): Observable<any> {
    return this.http.get(`${API_URL}user/history/${id}`, { responseType: 'text' });
  }

  //Function to get the list of engine types
  getServiceHistoryByDate(start,end): Observable<any> {
    return this.http.get(`${API_URL}user/bookings/${start}/${end}`, { responseType: 'text' });
  }

  //Function to get the list of mechanics working at the garage
  getMechanicList():Observable<any> {
    return this.http.get(`${API_URL}user/mechanics`, { responseType: 'text' });
  }

  /////////////PUT/////////
  updateBookingStatusMechanic(booking):Observable<any> {
    return this.http.put(`${API_URL}user/update-booking/${booking.id}/${booking.Mechanic}/${booking.Status}`, { responseType: 'text' });
  }


   //////////POST/////////////
    //Post a booking
    postBooking(bookingDetails): Observable<any> {
      console.log(bookingDetails);
      return this.http.post(API_URL + 'user/booking', {
        //First_name: booking.First_name,
        //Last_name: booking.Last_name,
        //Phone: booking.Phone,
        Comments: bookingDetails.Comments,
        Status: bookingDetails.Status,
        Date : bookingDetails.Date,
        Slot : bookingDetails.Slot,
        Service: bookingDetails.Type_service,
        id_vehicle: bookingDetails.id_vehicle
    },{ responseType: 'text' });
  }


}