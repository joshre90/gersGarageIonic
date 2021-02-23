import { Component, OnInit } from '@angular/core';

//my imports
import { TokenStorageService } from '../../_services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { Constants } from '../../_helper/constants'

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.page.html',
  styleUrls: ['./vehicle-register.page.scss'],
})
export class VehicleRegisterPage implements OnInit {

  id_user = "";
  ionicForm: FormGroup;
  isSubmitted = false;
  engine=[];
  vehicleType = [];
  make=[];
  errorMessage='';

  

  constructor(private tokenStorage: TokenStorageService, 
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private route: Router,
    private userService: UserService,
    public database: Constants) {}

  //If page is open
  ngOnInit() {
    //Getting the list of engines
    this.userService.getEngineList().subscribe(
      data => {
        this.engine = JSON.parse(data);
        console.log(this.engine);
      },
      err => {
        this.engine = JSON.parse(err.error).message;
      }
    );

    //Getting the list of vehicle makers
    this.userService.getMakeList().subscribe(
      data => {
        this.make = JSON.parse(data);
      },
      err => {
        this.make = JSON.parse(err.error).message;
      }
    );

    //Getting the list of Vehicle Types
    this.userService.getVehicleTypeList().subscribe(
      data => {
        this.vehicleType = JSON.parse(data);
      },
      err => {
        this.vehicleType = JSON.parse(err.error).message;
      }
    );

    this.id_user = this.tokenStorage.getUser().id;
    
    this.ionicForm = this.formBuilder.group({
      Licence: ['', [Validators.required, Validators.minLength(3)]],
      id_user: [this.id_user],
      engine: ['', [Validators.required]],
      vehicle_type: ['', [Validators.required]],
      make: ['', [Validators.required]]  
    })
  }

  // getDate(e) {
  //   let date = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.ionicForm.get('Date').setValue(date, {
  //     onlyself: true
  //   })
  // }

  // get errorControl() {
  //   return this.ionicForm.controls;
  // }

  submitForm() {
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      // console.log(this.ionicForm.value),
      this.userService.postVehicle(this.ionicForm.value).subscribe(
        data => {
          console.log('Sent',data);
          this.isSubmitted = true;
          this.database.checkIfCarsExist();
          this.presentAlert();
        },
        err => {
          this.errorMessage = err.error.message;
          console.log('eggog',this.errorMessage);
        }
      );
    }
  }


  //alert register
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Thanks',
      cssClass:'my-custom-class',
      subHeader: 'Your Vehicle has been added',
      message: 'Press OK to continue',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.route.navigate(['/menu']);
          console.log('Confirm Okay');
        }
      }]
    });

    await alert.present();
  }
}
