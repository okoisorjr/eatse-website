import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AuthService, CurrentUser } from '../auth.service';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { LoginDetails } from '../models/login-details.model';
import { signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginDetails: LoginDetails = new LoginDetails();
  currentUser: any;
  error!: string;
  submitted: boolean = false;

  constructor(
    private userService: GlobalResourceService,
    private auth: Auth,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(form: any) {
    this.error = '';
    this.submitted = true;
    console.log(this.submitted);
    if (this.loginDetails.email === ' ' && this.loginDetails.password === ' ') {
      this.submitted = false;
      this.error = 'Please enter your email address and password!';
    } else if (this.loginDetails.email === ' ') {
      this.submitted = false;
      this.error = 'Please enter your email address!';
    } else if (this.loginDetails.password === ' ') {
      this.submitted = false;
      this.error = 'Please enter your password!';
    } else {
      signInWithEmailAndPassword(
        this.auth,
        this.loginDetails.email,
        this.loginDetails.password
      )
      .then((res) => {
        this.submitted = false;
        this.userService.currentUser = res;
        console.log(this.userService.getPreviousUrl());
        this.router.navigate(['/'])
      })
      .catch((error) => {
        this.submitted = false;
        this.error = error.message;
      })
    }
  }
}
