import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';

@Component({
  selector: 'app-office-cleaning',
  templateUrl: './office-cleaning.component.html',
  styleUrls: ['./office-cleaning.component.css']
})
export class OfficeCleaningComponent implements OnInit {

  newBooking: NewBooking = new NewBooking();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoBooking(){
    this.router.navigate(['/booking']);
  }

  bookAppointment(){

  }

}
