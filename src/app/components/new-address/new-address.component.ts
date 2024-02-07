import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { AddressData } from 'src/app/pages/profile/address-data';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css'],
})
export class NewAddressComponent implements OnInit {
  newAddress: AddressData = new AddressData();
  @Input() currentUser!: UserAccount;
  @Output() closeModal = new EventEmitter();

  constructor(
    private profileService: ProfileService,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {}

  saveAddress(addressForm: any) {
    this.newAddress.user = this.currentUser.id;
    this.profileService.createAddress(this.newAddress).subscribe(
      (value) => {
        console.log(value._id);
        this.ngOnInit();
        this.notifier.notify('success', `${value}`);
        this.closeModal.emit(value);
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify('error', `${error.error.message}`);
        console.log(error.error.message);
      }
    );
  }

  dismissModal() {
    this.closeModal.emit();
  }
}
