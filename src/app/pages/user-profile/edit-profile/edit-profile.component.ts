import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { ProfileService } from 'src/app/services/profile.service';
import { AddressData } from '../../profile/address-data';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  currentUser!: UserAccount;
  addresses: AddressData[] = [];
  newAddress: AddressData = new AddressData();
  editAddress: AddressData = new AddressData();

  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal,
    private authService: AuthService,
    private notifier: NotifierService
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
  }

  openAddressModal(addressModal: any) {
    this.modalService.open(addressModal, { centered: true, size: 'lg' });
  }

  openEditAddressModal(selectedAddress: AddressData, editAddressModal: any) {
    this.editAddress = selectedAddress;
    this.modalService.open(editAddressModal, { centered: true, size: 'md' });
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
}
