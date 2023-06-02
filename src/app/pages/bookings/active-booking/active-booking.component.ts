import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingData, BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-active-booking',
  templateUrl: './active-booking.component.html',
  styleUrls: ['./active-booking.component.css']
})
export class ActiveBookingComponent implements OnInit {

  bookings: BookingData[] = [];
  activeRoute: string = '';
  currentUser: any;

  constructor(private bookingService: BookingsService, private auth: Auth, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.ar.url.subscribe((param) => {
      if(param[0].path === 'active'){
        this.activeRoute = param[0].path;
      }
    });
    this.bookingService.getBookings()
    .then((res) => {
      res.filter((booking) => {
        if(booking.userId === this.auth.currentUser?.uid)
        this.bookings.push(booking);
      });
      console.log(this.bookings);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  gotoBooking(){
    if(this.auth.currentUser){
      this.router.navigate(['/booking']);
    }else{
      this.router.navigate(['/auth/sign-in']);
    }
  }
}
