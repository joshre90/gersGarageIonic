import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  credentialsForm: FormGroup;
  contentVehicle ='';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder, private route: Router, private storage: Storage,  private userService:UserService) { }

  ngOnInit(): void {

      this.credentialsForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]] });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  

  onSubmit(): void {
    console.log(this.credentialsForm.value);
    this.authService.login(this.credentialsForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log('Roles:',this.roles);
        this.goToMenu();
        //this.checkVehicle();

      //   setTimeout(() => {
      //     this.reloadPage();
      // }, 300);
      },
      err => {

        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.errorMessage);
      }
    );
  }

  logOut(){
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToRegister() {
    this.route.navigate(['/register']);
  }

  goToMenu() {
    this.route.navigate(['/menu']);
  }


  // checkVehicle(){
  //   this.userService.getVehicleList().subscribe(data => {
  //     this.contentVehicle = data;
  //     console.log('content2',this.contentVehicle)
  //     console.log('content2 Length',this.contentVehicle.length)

  //     //this.storage.ready().then(() => this.storage.set("hasCars", "true"))

  //     this.storage.get('hasCars').then(valueStr => {
  //       let value = JSON.parse(valueStr);
    
  //        // Modify just that property
  //        value = true;
    
  //        // Save the entire data again
  //        this.storage.set('hasCars', JSON.stringify(value));
  //        this.storage.get('hasCars').then((val) => {
  //         console.log('Your car is: ', val);
  //       });
  //   });

  //   },
  //   err => {
  //     this.contentVehicle =  err.error;
  //     console.log(this.contentVehicle);

  //     this.storage.get('hasCars').then(valueStr => {
  //       let value = JSON.parse(valueStr);
    
  //        // Modify just that property
  //        value = false;
    
  //        // Save the entire data again
  //        this.storage.set('hasCars', JSON.stringify(value));

  //        this.storage.get('hasCars').then((val) => {
  //         console.log('Error! Your car is: ', val);
  //       });
  //   });

  //   }
  // );
  // }


}