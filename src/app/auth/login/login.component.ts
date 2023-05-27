import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AuthService, CurrentUser } from '../auth.service';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { LoginDetails } from '../models/login-details.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginDetails: LoginDetails = new LoginDetails();
  currentUser: any;
  error!: string;

  constructor(
    private notifier: NotifierService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(form: any) {
    if(this.loginDetails.email === ' ' && this.loginDetails.password === ' '){
      this.error = 'Please enter your email address and password!';
    } else if (this.loginDetails.email === ' ') {
      this.error = 'Please enter your email address!';
    } else if (this.loginDetails.password === ' ') {
      this.error = 'Please enter your password!';
    } else{
      this.currentUser = this.authService.signInUser(
        this.loginDetails.email,
        this.loginDetails.password
      );
      console.log(this.currentUser);
      if (this.currentUser) {
        this.router.navigate(['']);
      }
    }
  }
}
