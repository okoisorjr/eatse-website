import { Component, OnInit } from '@angular/core';

interface Testimonials {
  name: string;
  testimony: string;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  constructor() {}

  testimonials!: Testimonials[];

  ngOnInit(): void {
    this.testimonials = [
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
    ];
  }
}
