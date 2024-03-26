import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/model/user';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
})
export class MobileMenuComponent implements OnInit {
  @Input() menuState!: boolean;
  @Output() updateMenuState = new EventEmitter();
  @Output() signOut = new EventEmitter();

  currentUser!: User;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  hideMenu() {
    if (this.menuState) {
      this.menuState = !this.menuState;
      this.updateMenuState.emit(this.menuState);
    } else if (!this.menuState) {
      this.menuState = !this.menuState;
      this.updateMenuState.emit(this.menuState);
    }
  }

  gotoSignUp() {
    this.router.navigate(['/auth/sign-up']);
    this.hideMenu();
  }

  gotoLogin() {
    this.router.navigate(['/auth/sign-in']);
    this.hideMenu();
  }

  gotoProfile(view?: string) {
    if(view) {
      this.hideMenu();
      this.router.navigate(['profile', view]);
    } else {
      this.hideMenu();
      this.router.navigate(['/profile']);
    }
  }

  logOut() {
    this.hideMenu();
    this.signOut.emit();
  }
}
