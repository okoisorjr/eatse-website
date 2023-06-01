import { Injectable } from '@angular/core';
import { LaundryItems } from '../pages/bookings/model/laundry-items';
import { Room } from '../pages/bookings/model/room';
import {
  Firestore,
  query,
  addDoc,
  collection,
  getDocsFromServer,
  orderBy,
  where,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { GlobalResourceService } from '../global-resource/global-resource.service';

export interface BookingData {
  service?: string;
  frequency?: string;
  arrivalTime?: string;
  period?: string;
  dates?: string[];
  days?: string[];
  errandType?: string;
  items?: LaundryItems[];
  storeLocation?: string;
  deliveryAddress?: string;
  pickupAddress?: string;
  shoppingItems?: string;
  address?: string;
  cost?: number;
  rooms?: Room[];
  buildingType?: string;
  extraInformation?: string;
  percentageDiscount?: number;
  discountedPrice?: number;
  officeLocation?: string;
  officeEmail?: string;
  officeContact?: string;
  paymentStatus?: string;
  servicePrice?: number;
  userId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  booking_list: BookingData[] = [];

  constructor(
    private fs: Firestore,
    private auth: Auth,
    private userService: GlobalResourceService
  ) {}

  saveBooking(bookingData: BookingData) {
    const bookingRef = collection(this.fs, 'bookings');
    addDoc(bookingRef, bookingData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getBookings(): Promise<BookingData[]> {
    this.booking_list = [];
    if (this.auth.currentUser) {
      const bookingRef = collection(this.fs, 'bookings');
      const q = query(bookingRef, where('userId', '==', this.auth.currentUser.uid));
      let booking_data = await getDocsFromServer(q);
      booking_data.forEach((document) => {
        this.booking_list.push(document.data());
      });
    }
    console.log(this.booking_list);
    return this.booking_list;
  }
}
