import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {
  token!: string;
  message!: string;

  constructor(private ar: ActivatedRoute, private authService: AuthService) {
    this.ar.queryParams.subscribe((params) => {
      console.log(params);
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    if (this.token) {
      this.authService.verifyClientEmail({ id: this.token }).subscribe(
        (value) => {
          this.message = value.msg;
          console.log(value);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }
}
