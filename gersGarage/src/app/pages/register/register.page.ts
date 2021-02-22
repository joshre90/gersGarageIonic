import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  //form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  credentialsForm: FormGroup;
  

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      First_Name: ['',Validators.required],
      Last_Name:['', Validators.required],
      Phone: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    //console.log(this.credentialsForm.value);
    this.authService.register(this.credentialsForm.value).subscribe(
      data => {
        console.log(data);
        //console.log(this.form);
        console.log(this.credentialsForm.value);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
        console.log(this.isSignUpFailed);
      }
    );
  }

  goToLogin() {
    this.route.navigate(['/login']);
  }

}
