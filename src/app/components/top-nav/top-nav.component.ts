import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/auth/auth.service';
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
    this.currentUser = this.auth.currentUser;
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      let screenSize = window.innerWidth;
      
      if (screenSize <= 560) {
        this.isMobileDevice = true;
        
      } else {
        this.isMobileDevice = false;
        
      }
    });
    this.currentUser = this.auth.currentUser;
  }

  signOut(){
    this.auth.signOut();
    this.currentUser = null;
    if(this.currentUser == false){
      this.router.navigate(['/auth/login']);
    }
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
