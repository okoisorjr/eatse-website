import { Component, OnInit } from '@angular/core';

interface Services {
  image: string;
  service: string;
  description: string;
}

@Component({
  selector: 'app-eatse-services',
  templateUrl: './eatse-services.component.html',
  styleUrls: ['./eatse-services.component.css'],
})
export class EatseServicesComponent implements OnInit {
  services!: Services[];

  constructor() {}

  ngOnInit(): void {
    this.services = [
      {
        image: 'assets/housekeeping-img.png',
        service: 'Housekeeping',
        description:
          'Our lovely housekeepers will help clean and organize your house.',
      },
      {
        image: 'assets/deep-cleaning-img.png',
        service: 'Deep cleaning',
        description: '',
      },
      {
        image: 'assets/move-in-out-img.png',
        service: 'Move-in-out cleaning',
        description: '',
      },
      {
        image: 'assets/post-construction-img.png',
        service: 'Post construction cleaning',
        description:
          'This service offers a thorough clean up of the building after construction.',
      },
      {
        image: 'assets/office-cleaning-img.png',
        service: 'Office cleaning ',
        description:
          'Lets help you clean and organize your office while you focus on your work.',
      },
      {
        image: 'assets/laundry-img.png',
        service: 'Laundry',
        description: '',
      },
      {
        image: 'assets/errand-img.png',
        service: 'Errands',
        description: '',
      },
      {
        image: 'assets/fumigation-img.png',
        service: 'Fumigation',
        description: '',
      },
    ];
  }
}
