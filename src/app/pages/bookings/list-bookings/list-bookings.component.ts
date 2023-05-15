import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css'],
})
export class ListBookingsComponent implements OnInit {
  currentUser!: UserAccount;

  constructor(private user: GlobalResourceService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.user.getCurrentUser();
  }

  gotoBooking() {
    this.router.navigate(['/eatse/book-service']);
  }

  gotoLogin() {
    this.router.navigate(['/auth/sign-in']);
  }
}
