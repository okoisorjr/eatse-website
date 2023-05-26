import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AuthService, CurrentUser } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  currentUser!: CurrentUser;

  constructor(private notifier: NotifierService, private authService: AuthService, private globalService: GlobalResourceService, private router: Router, private auth: Auth) {}

  ngOnInit(): void {}

  handleLogin(form: any){
    this.authService.signInUser(this.email, this.password).subscribe((value) => {
      console.log(value);
      console.log(this.globalService.userInfoId);
      value.forEach(user => {
        if(user.uid === this.globalService.userInfoId){
          this.globalService.currentUser = user;
        }
      })
      
      console.log(this.globalService.currentUser);
      this.router.navigate(['/eatse']);
    })
  }

  /* login(form: any) {
    if (form.invalid) {
      return this.notifier.notify('error', 'Please, all fields are required!');
    }
    let user_credentials = {
      email: this.email,
      password: this.password
    }

    this.authService.login(user_credentials).subscribe((value) => {
      if(value){
        this.globalService.setCurrentUser(value.user);
        console.log(this.globalService.currentUser);
        localStorage.setItem('authorization', value.token);
        this.router.navigate(['/eatse/booking']);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  } */
}
