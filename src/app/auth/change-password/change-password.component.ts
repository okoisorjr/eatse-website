import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, confirmPasswordReset } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newPassword!: string;
  confirmPassword!: string;
  error!: string;
  success!: string;
  oobCode!: string;
  submitted: boolean = false;

  constructor(private auth: Auth, private ar: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.ar.queryParams.forEach((param: any) => {
      this.oobCode = param.oobCode;
      //console.log(param);
    });
  }

  back(){
    this.location.back();
  }

  async submitPassword(newPasswordForm: any){
    this.error = '';
    this.submitted = true;
    if(this.newPassword !== this.confirmPassword){
      this.error = 'Sorry, the passwords do not match!'
      setTimeout(() => { //clear error message after 3 seconds
        this.error = '';
      }, 3000);
      this.submitted = false;
    }else{
      confirmPasswordReset(this.auth, this.oobCode, this.newPassword).then(() => {
        this.success = 'Congratulations, your password has been updated successfully.'
        setTimeout(() => { //clear success message after 3 seconds
          this.success = '';
        }, 3000);
      }).catch((error) => {
        if(error.code === 'auth/invalid-action-code'){
          this.error = 'Invalid password reset link!';
        }
      });
      this.submitted = false;
    }
  }

}
