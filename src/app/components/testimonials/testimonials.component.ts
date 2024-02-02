import { Component, OnInit } from '@angular/core';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { TestimoniesService } from 'src/app/services/testimonies.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  constructor(private feedbacksService: TestimoniesService) {}

  testimonials: any[] = [];

  ngOnInit(): void {
    /* this.testimonials = [
      {
        name: 'Chidiaka',
        testimony: `I am so glad I found Eatse! They are my go to cleaning service, they
      offer outstanding quality of service. Everything is always so clean
      and sparkly in my house. They go as far as running errands and their
      services are so affordable. I would recommend Eatse to every
      household.`,
      },
      {
        name: 'Ochael',
        testimony: `I am so glad I found Eatse! They are my go to cleaning service, they
      offer outstanding quality of service. Everything is always so clean
      and sparkly in my house. They go as far as running errands and their
      services are so affordable. I would recommend Eatse to every
      household.`,
      },
      {
        name: 'Joe_rell',
        testimony: `I am so glad I found Eatse! They are my go to cleaning service, they
      offer outstanding quality of service. Everything is always so clean
      and sparkly in my house. They go as far as running errands and their
      services are so affordable. I would recommend Eatse to every
      household.`,
      },
    ]; */
    this.feedbacksService.fetchTestimonies().subscribe((value) => {
      this.testimonials = value;
      console.log(this.testimonials);
    });
  }
}
