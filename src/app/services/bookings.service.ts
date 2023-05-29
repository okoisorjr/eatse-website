import { Injectable } from '@angular/core';
import { LaundryItems } from '../pages/bookings/model/laundry-items';
import { Room } from '../pages/bookings/model/room';
import {
  CollectionReference,
  Firestore,
  query,
  addDoc,
  collection,
  getDocs,
  docSnapshots,
  getDocsFromServer,
  DocumentData,
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
  cost?: string;
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
  query: any;
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
      let booking_data = await getDocsFromServer(bookingRef);
      booking_data.forEach((document) => {
        this.booking_list.push(document.data());
      });
    }

    return this.booking_list;
  }
}
