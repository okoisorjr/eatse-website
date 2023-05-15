import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private notifier: NotifierService, private authService: AuthService, private globalService: GlobalResourceService) {}

  ngOnInit(): void {}

  login(form: any) {
    if (form.invalid) {
      return this.notifier.notify('error', 'Please, all fields are required!');
    }
    let user_credentials = {
      email: this.email,
      password: this.password
    }

    this.authService.login(user_credentials).subscribe((value) => {
      if(value){
        this.globalService.currentUser = value;
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  }
}
