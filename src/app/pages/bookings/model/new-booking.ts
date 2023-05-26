import { Room } from "./room";

export class NewBooking {
  service!: string;
  frequency!: string;
  arrivalTime!: string;
  period!: string;
  dates!: string[];
  address!: string;
  cost: string = '0';
  rooms: Room[] = [];
  buildingType?: string;
  extraInformation?: string;
  percentageDiscount!: string;
  discountedPrice!: string;
  officeLocation?: string;
  officeEmail?: string;
  officeContact?: string;
}
