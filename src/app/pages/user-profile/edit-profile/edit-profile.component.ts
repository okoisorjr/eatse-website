import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { ProfileService } from 'src/app/services/profile.service';
import { AddressData } from '../../profile/address-data';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/auth/model/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  @Input() currentUser!: User;
  @Output() refreshProfile = new EventEmitter();

  //currentUser!: UserAccount;
  addresses: AddressData[] = [];
  newAddress: AddressData = new AddressData();
  editAddress: AddressData = new AddressData();
  filename!: string;
  showNewAddressDialog: boolean = false;
  showEditAddressDialog: boolean = false;

  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal,
    private authService: AuthService,
    private notifier: NotifierService
  ) {
    //this.currentUser = this.authService.getCurrentUser();
  }

  dismissModal() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
    this.profileService
      .fetchClientAddresses(this.authService.currentUser.id)
      .subscribe(
        (value) => {
          this.addresses = value;
          console.log(value);
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.filename = file.name;

      const formData = new FormData();

      formData.append('file', file);

      this.profileService
        .uploadProfileImg(formData, this.authService.currentUser.id)
        .subscribe(
          (value) => {
            console.log(value);
            this.authService.fetchUpdatedAccountInfo().subscribe((value) => {
              this.authService.user.next(value);
              this.authService.currentUser = value;
              this.refreshProfile.emit();
            });
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
    }
    console.log(event);
  }

  displayNewAddressDialog() {
    this.showNewAddressDialog = true;
  }

  displayEditAddressDialog(address: AddressData) {
    this.editAddress = address;
    this.showEditAddressDialog = true;
  }

  openAddressModal(addressModal: any) {
    //this.modalService.open(addressModal, { centered: true, size: 'lg' });
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
          this.showEditAddressDialog = !this.showEditAddressDialog;
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify('error', `${error.error.message}`);
          /* console.log(error.error.message); */
        }
      );
  }
}
