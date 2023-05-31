import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;

  constructor(private auth: Auth, private globalService: GlobalResourceService) { 
    this.auth.onAuthStateChanged((credential) => {
      if(credential){
        this.currentUser = credential;
      }
    });

    console.log(this.globalService.getPreviousUrl());
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
  }

}
