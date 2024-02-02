import { Injectable } from '@angular/core';
import { LaundryItems } from '../pages/bookings/model/laundry-items';
import { Room } from '../pages/bookings/model/room';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewBooking } from '../pages/bookings/model/new-booking';
import { NewLaundry } from '../pages/bookings/model/new-laundry';

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

  constructor(private http: HttpClient) {}

  saveBooking(bookingData: NewBooking): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/booking/new-booking`,
      bookingData
    );
  }

  saveLaundry(newLaundry: NewLaundry): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/laundry`,
      newLaundry
    );
  }

  getAllBookings(user_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.developmentIP}/combined-bookings/${user_id}`
    );
  }

  getAllActiveBookings(user_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.developmentIP}/combined-bookings/active/${user_id}`
    );
  }

  fetchRoomsAndPrices(service: string): Observable<any> {
    return this.http.get<any>(
      `${environment.developmentIP}/room-prices/${service}`
    );
  }

  fetchLaundryItems(): Observable<LaundryItems[]> {
    return this.http.get<LaundryItems[]>(
      `${environment.developmentIP}/laundry-items`
    );
  }
}
