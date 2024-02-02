import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordChange } from '../models/password-change';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  newPassword: PasswordChange = new PasswordChange();
  confirmPassword!: string;
  error!: string;
  success!: string;
  submitted: boolean = false;

  constructor(
    private auth: AuthService,
    private ar: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.ar.queryParams.forEach((param: any) => {
      this.newPassword.id = param.user;
      this.newPassword.token = param.token;
    });
  }

  back() {
    this.location.back();
  }

  async submitPassword(newPasswordForm: any) {
    this.submitted = true;
    if (this.newPassword.newPassword !== this.confirmPassword) {
      this.error = 'Password mismatch!';
      this.submitted = false;
      return;
    }
    this.auth.changePassword(this.newPassword).subscribe(
      (value) => {
        console.log(value);
        this.submitted = false;
      },
      (error: HttpErrorResponse) => {
        this.submitted = false;
        console.log(error);
      }
    );
  }
}
