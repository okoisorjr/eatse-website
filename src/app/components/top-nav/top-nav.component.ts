import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CurrentUser } from 'src/app/auth/auth.service';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  isMobileDevice!: boolean;
  displayDropdown: boolean = false;
  mobileMenuActive: boolean = false;
  currentUser!: any;

  constructor(
    private router: Router,
    private auth: Auth,
  ) {
    this.auth.onAuthStateChanged((credential) => {
      if(credential){
        this.currentUser = credential;
      }
    })
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((credential) => {
      if (credential) {
        this.currentUser = credential;
      }
    });
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

  logout() {
    this.auth.signOut();
    console.log('signed out!');
    this.router.navigateByUrl('/auth/sign-in', {skipLocationChange: true});
  }

  signOut(){
    this.auth.signOut();
    this.router.navigate(['auth', 'sign-in']);
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
