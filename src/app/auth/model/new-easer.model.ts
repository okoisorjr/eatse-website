import { BankDetails } from "./bank-details.model";

export class NewEaser {
  firstname!: string;
  lastname!: string;
  email!: string;
  phone!: string;
  residentState!: string;
  residentCity!: string;
  residentAddress!: string;
  password: string = 'NEWEASER';
}
