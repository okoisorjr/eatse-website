import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { NewUser } from '../models/new-user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Roles } from '../models/roles';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  confirmPassword!: string;
  newUser: NewUser = new NewUser();
  error: string = '';
  submitted: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  register(form: any) {
    this.newUser.role = Roles.CLIENT;
    this.error = '';
    this.submitted = true;
    this.authService.createNewClientAccount(this.newUser).subscribe(
      (value) => {
        this.submitted = false;
        this.router.navigate(['/auth/registration-success']);
        console.log(value);
      },
      (error: HttpErrorResponse) => {
        this.submitted = false;
        this.error = error.error.message;
      }
    );
  }
}
