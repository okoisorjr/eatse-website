import { Component, OnInit } from '@angular/core';

interface BookingSteps {
  icon: string;
  step: string;
  description: string;
}

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.css'],
})
export class BookingProcessComponent implements OnInit {
  steps!: BookingSteps[];
  constructor() {}

  ngOnInit(): void {
    this.steps = [
      {
        icon: 'assets/process-service-img.png',
        step: 'Choose service',
        description: 'Choose from the number of available services we offer.',
      },
      {
        icon: 'assets/process-duration-img.png',
        step: 'Set time and Duration',
        description: 'Pick the most convenient time for your easer to arrive.',
      },
      {
        icon: 'assets/process-frequency-img.png',
        step: 'Set frequency',
        description: 'Pick how often you will want an Easer sent to you.',
      },
      {
        icon: 'assets/process-location-img.png',
        step: 'Enter address',
        description:
          'Fill in your residential address, so we can send an easer to you.',
      },
    ];
  }
}
