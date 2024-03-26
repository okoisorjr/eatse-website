import { Component, OnInit } from '@angular/core';
import { PasswordChange } from 'src/app/auth/models/password-change';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  newPassword: PasswordChange = new PasswordChange();
  confirmPassword!: string;

  constructor() {}

  ngOnInit(): void {}

  updatePassword(changePasswordForm?: any) {}
}
