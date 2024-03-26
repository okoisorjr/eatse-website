import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/model/user';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  isMobileDevice!: boolean;
  displayDropdown: boolean = false;
  mobileMenuActive: boolean = false;
  currentUser: User;
  showBookingMenu: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit(): void {
    this.router.url.includes('active');
    window.addEventListener('resize', () => {
      let screenSize = window.innerWidth;

      if (screenSize <= 460) {
        this.isMobileDevice = true;
      } else {
        this.isMobileDevice = false;
        this.mobileMenuActive = false;
      }
    });
  }

  /* logout() {
    console.log('signed out!');
    this.router.navigateByUrl('/auth/sign-in', { skipLocationChange: true });
  } */

  signOut() {
    this.authService.signOut().subscribe(
      (value: string) => {
        this.authService.clearTokens();
        console.log(value);

        this.router.navigate(['auth', 'sign-in']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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

  toggleDropdown() {
    this.displayDropdown = !this.displayDropdown;
    console.log(this.displayDropdown);
  }
}
