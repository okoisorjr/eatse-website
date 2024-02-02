import { LaundryItems } from "./laundry-items";
import { Room } from "./room";

export class NewBooking {
  service!: string;
  frequency!: string;
  arrivalTime!: string;
  period!: string;
  dates!: number[];
  days!: string[];
  address!: string;
  cost!: number;
  house_setting: any[] = [];
  servicePrice!: number;
  rooms: number = 0;
  buildingType?: string;
  extraInformation?: string;
  percentageDiscount!: number;
  discountedPrice!: number;
  paymentStatus?: string;
  client?: string;
  message!: string;
  expiryDate?: any;
  startingDate?: any;
}
