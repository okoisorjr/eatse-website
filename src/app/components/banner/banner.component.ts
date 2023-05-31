import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  currentUser: any;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((credential) => {
      if (credential) {
        this.currentUser = credential;
      }
    });
  }

  ngOnInit(): void {}

  gotoRegister(){
    this.router.navigate(['/auth/sign-up']);
  }
}
