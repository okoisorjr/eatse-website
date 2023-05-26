import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/auth/auth.service';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  isMobileDevice!: boolean;
  displayDropdown: boolean = false;
  mobileMenuActive: boolean = false;
  currentUser!: CurrentUser;

  constructor(
    private router: Router,
    private globalService: GlobalResourceService,
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
    this.currentUser  = this.globalService.getCurrentUser();
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

  toggleDropdown(){
    this.displayDropdown = !this.displayDropdown;
    console.log(this.displayDropdown);
  }
}
