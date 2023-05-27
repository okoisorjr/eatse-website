import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentUser: any;

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
  }

}
