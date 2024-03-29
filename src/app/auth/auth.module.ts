import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EaserRegistrationComponent } from './easer-registration/easer-registration.component';
import { EaserSuccessComponent } from './easer-success/easer-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterSuccessComponent, ForgotPasswordComponent, EaserRegistrationComponent, EaserSuccessComponent, ChangePasswordComponent, EmailVerificationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
