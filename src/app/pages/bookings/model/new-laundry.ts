import { LaundryItems } from "./laundry-items";

export class NewLaundry {
  address!: string;
  cost: number = 0 ;
  items: LaundryItems[] = [];
  totalItems!: number;
  message!: string;
  service!: string;
  frequency?: string;
  pickupTime!: string;
  dates!: number[];
  days!: string[];
  client!: string;
  paymentStatus?: string; 
}
