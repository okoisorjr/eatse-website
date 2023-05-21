import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  isMobileDevice!: boolean;
  mobileMenuActive: boolean = false;

  constructor(
    private router: Router,
    private globalService: GlobalResourceService
  ) {}

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      let screenSize = window.innerWidth;
      console.log(screenSize);
      if (screenSize <= 560) {
        this.isMobileDevice = true;
        console.log(this.isMobileDevice);
      } else {
        this.isMobileDevice = false;
        console.log(this.isMobileDevice);
      }
    });
  }

  gotoLogin() {
    this.router.navigate(['auth', 'sign-in']);
  }

  showMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

  hideMenu($event: any) {
    this.mobileMenuActive = $event;
  }

  hideComponentMenu() {
    this.mobileMenuActive = false;
  }
}
