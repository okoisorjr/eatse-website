import { Injectable } from '@angular/core';
import { LaundryItems } from '../pages/bookings/model/laundry-items';
import { Room } from '../pages/bookings/model/room';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

export interface BookingData{
  service: string;
  frequency: string;
  arrivalTime: string;
  period: string;
  dates: string[];
  days?: string[];
  errandType?: string;
  items: LaundryItems[];
  storeLocation?: string;
  deliveryAddress?: string;
  pickupAddress?: string;
  shoppingItems?: string;
  address: string;
  cost: string;
  rooms: Room[];
  buildingType?: string;
  extraInformation?: string;
  percentageDiscount: string;
  discountedPrice: string;
  officeLocation?: string;
  officeEmail?: string;
  officeContact?: string;
  paymentStatus?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private fs: Firestore) { }

  saveBooking(bookindData: BookingData){
    const bookingsRef = collection(this.fs, 'bookings')
    addDoc(bookingsRef, bookindData)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
