import { Component, OnInit } from '@angular/core';
import { NewBooking } from '../model/new-booking';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-booking-page',
  templateUrl: './service-booking-page.component.html',
  styleUrls: ['./service-booking-page.component.css']
})
export class ServiceBookingPageComponent implements OnInit {

  service!: string;

  constructor(private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.service = this.ar.snapshot.params['id'];
  }

}
