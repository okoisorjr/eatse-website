import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  mobileMenu!: boolean;

  constructor(
    private router: Router,
    private globalService: GlobalResourceService
  ) {}

  ngOnInit(): void {
    this.mobileMenu = this.globalService.getMobileMenuState();
    console.log(this.mobileMenu);
  }

  gotoLogin() {
    this.router.navigate(['auth', 'sign-in']);
  }

  showMenu() {
    this.globalService.setMobileMenuState(true);
    this.mobileMenu = this.globalService.getMobileMenuState();
  }
}
