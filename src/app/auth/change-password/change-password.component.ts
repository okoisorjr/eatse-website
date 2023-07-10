import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, confirmPasswordReset } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newPassword!: string;
  confirmPassword!: string;
  error!: string;
  oobCode!: string;
  submitted: boolean = false;

  constructor(private auth: Auth, private ar: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.ar.queryParams.forEach((param: any) => {
      this.oobCode = param.oobCode;
      //console.log(param);
    })
  }

  back(){
    this.location.back();
  }

  async submitPassword(newPasswordForm: any){
    this.submitted = true;
    if(this.newPassword !== this.confirmPassword){
      this.error = 'Sorry, the passwords do not match!'
      this.submitted = false;
    }else{
      confirmPasswordReset(this.auth, 'BTSNC4_jjUwOSJFM1YRdSioDeRnrOQzm5uOqm8BLyeAAAAGJQEW83A', this.newPassword).then((res) => {
        console.log(res);
        
      }).catch((error) => {
        if(error.code === 'auth/invalid-action-code'){
          this.error = 'Invalid password reset link!';
        }
      });
      this.submitted = false;
    }
  }

}
