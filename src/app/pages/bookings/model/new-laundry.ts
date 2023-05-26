import { LaundryItems } from "./laundry-items";

export class NewLaundry {
  pickupAddress!: string;
  cost: string = '0' ;
  items: LaundryItems[] = [];
  deliveryAddress!: string;
  extraInformation!: string;
  service!: string;
  frequency?: string;
}
