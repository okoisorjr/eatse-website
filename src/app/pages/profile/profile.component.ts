import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import {
  ClientEaser,
  UserAccount,
} from 'src/app/auth/models/user-account.model';
import { ProfileService } from 'src/app/services/profile.service';
import { AddressData } from './address-data';
import { NotifierService } from 'angular-notifier';
import { BookingsService } from 'src/app/services/bookings.service';
import { Router } from '@angular/router';
import { PasswordChange } from 'src/app/auth/models/password-change';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentDisplay: string = 'Profile';
  newPassword: PasswordChange = new PasswordChange();
  confirmPassword!: string;
  links: any[] = [];
  currentUser!: UserAccount;
  addresses: AddressData[] = [];
  notifications: any[] = [];
  bookings: any[] = [];
  easers: ClientEaser[] = [];
  easer: ClientEaser = new ClientEaser();
  activeBookings: any[] = [];
  newAddress: AddressData = new AddressData();
  editAddress: AddressData = new AddressData();
  selectedBooking!: any;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private notifier: NotifierService,
    private profileService: ProfileService,
    private bookingService: BookingsService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  dismissModal() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.profileService.fetchClientAddresses(this.currentUser.id).subscribe(
      (value) => {
        this.addresses = value;
        console.log(value);
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
      }
    );

    // Side menu links
    this.links = [
      { name: 'Profile', icon: 'person' },
      { name: 'Change password', icon: 'lock' },
      { name: 'Active booking', icon: 'event_note' },
      { name: 'Booking history', icon: 'history' },
      { name: 'Notifications', icon: 'notifications' },
    ];
  }

  openAddressModal(addressModal: any) {
    this.modalService.open(addressModal, { centered: true, size: 'lg' });
  }

  openEditAddressModal(selectedAddress: AddressData, editAddressModal: any) {
    this.editAddress = selectedAddress;
    this.modalService.open(editAddressModal, { centered: true, size: 'md' });
  }

  openCancelBookingConfirmationModal(
    cancelBookingConfirmationModal: any,
    booking: any
  ) {
    this.selectedBooking = booking;
    this.modalService.open(cancelBookingConfirmationModal, {
      centered: true,
      size: 'md',
    });
    console.log(this.selectedBooking);
  }

  updateView(name: string) {
    this.currentDisplay = name;
    if (name == 'Active booking') {
      // Fetch client assigned easer
      this.profileService
        .fetchClientEaser(this.currentUser.id)
        .subscribe((value) => {
          this.easers = value;
          this.easer = value[0];
          console.log(this.easer);
        });

      // Fetch all users active bookings
      this.bookingService.getAllActiveBookings(this.currentUser.id).subscribe(
        (value) => {
          this.activeBookings = value;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else if (name == 'Booking history') {
      // Fetch all users bookings both active and Inactive
      this.bookingService.getAllBookings(this.currentUser.id).subscribe(
        (value) => {
          if (value) {
            this.bookings = value;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else if (name == 'Notifications') {
      this.profileService
        // Fetch all notifications
        .fetchClientNotifications(this.currentUser.role)
        .subscribe(
          (value) => {
            this.notifications = value;
          },
          (error: HttpErrorResponse) => {
            console.log(error.error.message);
          }
        );
    }
  }

  updateAddress(editAddressForm: any) {
    this.profileService
      .updateAddress(this.editAddress._id, this.editAddress)
      .subscribe(
        (value) => {
          this.notifier.notify('success', `${value._id}`);
          this.ngOnInit();
          this.modalService.dismissAll();
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify('error', `${error.error.message}`);
          /* console.log(error.error.message); */
        }
      );
  }

  updatePassword(changePasswordForm?: any) {}

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

  deactivateBooking() {}

  logout() {}
}
