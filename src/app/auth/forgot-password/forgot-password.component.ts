import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PasswordReset } from '../models/password-reset';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  resetPassword: PasswordReset = new PasswordReset();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async sendPasswordResetLink(form: any) {
    this.authService.forgotPassword(this.resetPassword).subscribe(
      (value) => {
        console.log(value);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    /* let result = await sendPasswordResetEmail(this.auth, this.email, this.actionCodeSettings);
    console.log(result); */
  }
}
