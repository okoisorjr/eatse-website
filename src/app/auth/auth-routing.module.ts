import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EaserRegistrationComponent } from './easer-registration/easer-registration.component';
import { EaserSuccessComponent } from './easer-success/easer-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/sign-in' },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'easer-registration', component: EaserRegistrationComponent },
  { path: 'easer-success', component: EaserSuccessComponent },
  { path: 'registration-success', component: RegisterSuccessComponent },
  { path: 'reset-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: ChangePasswordComponent },
  { path: 'verify-account', component: EmailVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
