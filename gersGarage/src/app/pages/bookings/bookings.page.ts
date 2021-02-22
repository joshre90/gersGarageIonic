import { Component, OnInit,ViewChild, Inject, LOCALE_ID } from '@angular/core';

//Our Imports
import { PickerController, AlertController, ModalController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CalendarComponent } from 'ionic2-calendar';
import { CalModalPage } from '../cal-modal/cal-modal.page';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { Constants } from '../../_helper/constants';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
  })
  export class BookingsPage implements OnInit {

    eventSource = []; 
    @ViewChild(CalendarComponent) myCal: CalendarComponent;

    ionicForm: FormGroup;
    bookingDate = new Date();
    dateOther = '';
    isdata = [];
    slotpicker: string[] = ['8:00-10:00', '10:30-12:30', '13:00-15:00', '15:30-17:30'];
    slot = '';
    service_list = [];
    car = [];
    errorMessage = '';
  
    constructor(
        private tokenStorage: TokenStorageService, 
        public formBuilder: FormBuilder, 
        private pickerController: PickerController, 
        private alertCtrl: AlertController, 
        @Inject(LOCALE_ID) private locale: string, 
        private modalCtrl: ModalController, 
        private route: Router, 
        public isVehicle: Constants, 
        private userService: UserService) {}
    ionViewDidEnter() {
       // console.log('Does user has registerd vehicle?: ',this.isVehicle.registerState)
        if (!this.isVehicle.registerState) {
            this.presentAlertConfirm()
        } else {
            this.populateCarArray();
        }
    };
    ionViewDidLeave() {
        while (this.car.length > 0) {
            this.car.pop();
        }
    }
    ngOnInit() {
       // console.log(this.bookingDate)
        //console.log('Slots',this.isVehicle.hours);

        //Getting the list of Service Type
        this.userService.getServiceType().subscribe(data => {
            let incoming = JSON.parse(data);
            for (var i in incoming) {
                this.service_list.push(incoming[i].name);
            }
        }, err => {
            this.service_list = JSON.parse(err.error).message;
        });
        this.dateOther = this.bookingDate.getFullYear() + '-' + (this.bookingDate.getMonth() + 1) + '-' + this.bookingDate.getDate();
		
		///Ionic reactive form
		this.ionicForm = this.formBuilder.group({
            First_name: ['', [Validators.required, Validators.minLength(3)]],
            Last_name: ['', [Validators.required, Validators.minLength(4)]],
            Phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            Type_service: ['', [Validators.required]],
            Comments: ['', [Validators.required]],
            Status: ['Booked'],
            Date: [this.dateOther, [Validators.required]],
            id_vehicle: ['', [Validators.required]]
        })
	}
	
    submitForm() {
        //this.isSubmitted = true;
        if (!this.ionicForm.valid) {
           // console.log('Please provide all the required values!')
            return false;
        } else {
            //console.log(this.ionicForm.value),
                this.isdata = this.ionicForm.value,
            this.userService.postBooking(this.isdata).subscribe(data => {
                this.presentAlert();
                this.isVehicle.serviceHistoryList();
                this.ionicForm.reset();
            }, err => {
				this.errorMessage = err.error.message;
				this.errorAlert(err);
               // console.log('eggog', this.errorMessage);
            });
        }
    }

    //https://www.learmoreseekmore.com/2020/01/ionic-picker-sample-code-in-angular.html
    //Picker to select the slots(working hours)
    async showPicker() {
        let options: PickerOptions = {
            buttons: [{
                text: "Cancel",
                role: 'cancel'
            }, {
                text: 'Confirm',
                handler: (value: any) => {
                   // console.log('V', value);
                    this.slot = value.Slot.text;
                    this.convertHourstoSlot(this.slot);
                }
            }],
            columns: [{
                name: 'Slot',
                options: this.getColumnOptions()
            }]
        };
        let picker = await this.pickerController.create(options);
        picker.present()
       // console.log(picker);
    }
    getColumnOptions() {
        let options = [];
        this.slotpicker.forEach(x => {
            options.push({
                text: x,
                value: x
            });
        });
        return options;
    }

    convertHourstoSlot(data) {
        if (data == '8:00-10:00') {

            this.bookingDate.setHours(8);

        } else if (data == '10:30-12:30') {
            this.bookingDate.setHours(10);
            this.bookingDate.setMinutes(30);
        } else if (data == '13:00-15:00') {
            this.bookingDate.setHours(13);
        } else if (data == '15:30-17:30') {
            this.bookingDate.setHours(15);
            this.bookingDate.setMinutes(30);
        }
        this.ionicForm.get('Date').setValue(this.bookingDate);
        //console.log(this.ionicForm.get('Date'));
    }
    populateCarArray() {
        for (const i in this.isVehicle.vehicleList) {
            //console.log(this.isVehicle.vehicleList[i]._id.Make);
            this.car.push({
                name: this.isVehicle.vehicleList[i]['_id']['Make'],
                id_vehicle: this.isVehicle.vehicleList[i]['_id']['id_vehicle']
            })
        }
       // console.log(this.car);
    }

    //calendar call
    async openCalModal() {
        const modal = await this.modalCtrl.create({
            component: CalModalPage,
            cssClass: 'cal-modal',
            backdropDismiss: false
        });
        await modal.present();
        modal.onDidDismiss().then((result) => {
            if (result.data && result.data.event) {
                let event = result.data.event;
                if (event.allDay) {
                    let start = event.startTime;
                    event.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
                    //event.endTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 1));
                }
                this.eventSource.push(result.data.event);
                this.bookingDate = result.data.event.startTime; //Picked date on the calendar
                //console.log('DATAOTHER: ',this.bookingDate);
                this.dateOther = this.bookingDate.getFullYear() + '-' + (this.bookingDate.getMonth() + 1) + '-' + this.bookingDate.getDate();
                //this.dateOther = this.bookingDate.toISOString();
            }
        });
    }

    async presentAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Thanks',
            cssClass: 'my-custom-class',
            subHeader: 'Your booking has been added',
            message: 'Press OK to continue',
            buttons: ['OK']
        });
        await alert.present();
    }

    //alert access tab 2
    async presentAlertConfirm() {
        const alert = await this.alertCtrl.create({
            header: 'Sorry!',
            cssClass: 'my-custom-class',
            message: 'You need to register a vehicle',
            buttons: [{
                text: 'Okay',
                handler: () => {
                    this.route.navigate(['/menu/user-services']);
                   // console.log('Confirm Okay');
                }
            }],
            backdropDismiss: false
        });
        await alert.present();
    }
	
  //Error in case posting is not succesufull
	async errorAlert(err) {
        const alert = await this.alertCtrl.create({
            header: 'Error!',
            cssClass: 'my-custom-class',
            subHeader: 'There has been an error posting your booking',
            message: err,
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.route.navigate(['/menu/user-services']);
                }
            }]
        });
        await alert.present();
    }

};