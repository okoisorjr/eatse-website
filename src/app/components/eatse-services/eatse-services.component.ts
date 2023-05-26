import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

interface Services {
  image: string;
  service: string;
  description: string;
}

interface Service {
  service: string;
  description: string;
  cost: string;
}

@Component({
  selector: 'app-eatse-services',
  templateUrl: './eatse-services.component.html',
  styleUrls: ['./eatse-services.component.css'],
})
export class EatseServicesComponent implements OnInit {
  services!: Services[];
  eatseServices!: Service[];

  constructor(
    private globalServices: GlobalResourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.services = [
      {
        image: 'assets/housekeeping-img.png',
        service: 'house-keeping',
        description:
          'Our lovely housekeepers will help clean and organize your house.',
      },
      {
        image: 'assets/deep-cleaning-img.png',
        service: 'deep-cleaning',
        description:
          'We offer a thorough deep cleaning service which each and every hard-to-reach corners, areas often overlooked, appliance and fixtures of the home is thoroughly cleaned to get rid of dirt, germs and bacteria.',
      },
      {
        image: 'assets/move-in-out-img.png',
        service: 'move-in-out-cleaning',
        description:
          "This service includes a complete clean up before you move into a building or when you've moved out",
      },
      {
        image: 'assets/post-construction-img.png',
        service: 'post-construction-cleaning',
        description:
          'Our post construction services include a thorough clean up of the building and its environment after the construction',
      },
      {
        image: 'assets/office-cleaning-img.png',
        service: 'office-cleaning ',
        description:
          'Lets help you clean and organize your office while your focus on work. Our office cleaners are professionals who understands the office setting and will deliver top-notch service.',
      },
      {
        image: 'assets/laundry-img.png',
        service: 'laundry',
        description:
          'Your laundry will be done by honest and trustworthy highly trained professionals with years of experience, using latest advance laundry equipment.',
      },
      {
        image: 'assets/errand-img.png',
        service: 'errands',
        description:
          'Let us keep your cupboards, fridge and freezer stocked so you never run out of food. Provide us with a list, leave it to us to buy your preferred items. We do the whole thing from shopping, delivering and stocking them where the belong',
      },
      {
        image: 'assets/fumigation-img.png',
        service: 'fumigation',
        description:
          'We offer different fumigation and pest control service frequencies according to your needs and preferences',
      },
    ];
  }

  routeToService(service: string) {
    this.router.navigate(['/eatse/services/' + service]);
  }
}
