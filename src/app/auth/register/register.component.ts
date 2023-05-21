import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { NewUser } from '../models/new-user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstname!: string;
  lastname!: string;
  email!: string;
  phone!: string;
  password!: string;
  confirmPassword!: string;
  newUser: NewUser = new NewUser();

  constructor(
    private authService: AuthService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(form: any) {
    console.log(form.value);
    if (form.invalid) {
      return this.notifier.notify('error', 'Please, all fields are required!');
    }
    /* if(form.controls['confirmPassword'].value !== form.controls['password'].value){
      return this.notifier.notify('error', 'Oops!....password mismatch!');
    } */

    this.authService.registerAccount(this.newUser).subscribe(
      (value) => {
        if (value) {
          console.log(value);
          this.router.navigate(['/auth/registration-success']);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.notifier.notify(
          'error',
          `${error.error.msg}`
        );
      }
    );
  }
}
