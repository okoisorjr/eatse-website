import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginDetails } from '../models/login-details.model';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { mergeMap } from 'rxjs/operators';
import { Location } from '@angular/common';

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
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private globalService: GlobalResourceService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  login(form: any) {
    this.error = '';
    this.submitted = true;
    this.authService.loginClient(this.loginDetails).subscribe(
      (value) => {
        if (value) {
          this.authService.currentUser = value.user;
          this.authService.user.next(value);
          this.authService.save_user_id(value.user.id);
          this.authService.saveTokens(value.access_token, value.refresh_token);
          //localStorage.setItem('access_token', value.access_token);
          //localStorage.setItem('refresh_token', value.refresh_token);
        }
        //this.router.navigate(['/']);
        this.location.back();
      },
      (error: HttpErrorResponse) => {
        this.submitted = false;
        this.error = error.error.message;
      }
    );
  }

  viewPassword(value?: any) {
    this.showPassword = !this.showPassword;
  }
}
