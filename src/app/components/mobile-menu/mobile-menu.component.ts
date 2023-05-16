import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
})
export class MobileMenuComponent implements OnInit {
  @Input() menuState!: boolean;
  @Output() updateMenuState = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  hideMenu() {
    if (this.menuState) {
      this.menuState = !this.menuState;
      this.updateMenuState.emit(this.menuState);
    } else if (!this.menuState) {
      this.menuState = !this.menuState;
      this.updateMenuState.emit(this.menuState);
    }
  }

  gotoSignUp(){
    this.router.navigate(['/auth/sign-up']);
    this.hideMenu();
  }

  gotoLogin(){
    this.router.navigate(['/auth/sign-in']);
    this.hideMenu();
  }
}
