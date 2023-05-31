import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { GlobalResourceService, Services } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentUser: any;
  services: any[] = [];

  constructor(private auth: Auth, private globalService: GlobalResourceService) { }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
     this.globalService.fetchFooterServices().then((doc) => {
      this.services = doc;
    });
  }

}
