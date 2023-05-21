import { Room } from "./room";

export class NewBooking {
  service!: string;
  frequency!: string;
  arrivalTime!: string;
  period!: string;
  dates!: string[];
  address!: string;
  cost: string = '0';
  rooms: Room = new Room();
}
