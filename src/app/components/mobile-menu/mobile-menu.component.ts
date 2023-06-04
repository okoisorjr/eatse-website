import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
})
export class MobileMenuComponent implements OnInit {
  @Input() menuState!: boolean;
  @Output() updateMenuState = new EventEmitter();
  @Output() signOut = new EventEmitter();

  currentUser: any;

  constructor(
    private router: Router,
    private auth: Auth,
    private userService: GlobalResourceService
  ) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((credential) => {
      if (credential) {
        this.currentUser = credential;
      }
    });
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

  logOut() {
    this.hideMenu();
    this.signOut.emit();
  }
}
