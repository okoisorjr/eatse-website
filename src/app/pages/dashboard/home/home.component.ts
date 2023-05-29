import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;

  constructor(private auth: Auth) { 
    this.auth.onAuthStateChanged((credential) => {
      if(credential){
        this.currentUser = credential;
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
  }

}
