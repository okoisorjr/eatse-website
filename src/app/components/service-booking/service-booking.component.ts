import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Service{
  image: string;
  service: string;
  description: string;
}

@Component({
  selector: 'app-service-booking',
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.css']
})
export class ServiceBookingComponent implements OnInit {

  services: Service[] = [];
  constructor(private router: Router) { }

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
        description: '',
      },
      {
        image: 'assets/move-in-out-img.png',
        service: 'move-in-out-cleaning',
        description: '',
      },
      {
        image: 'assets/post-construction-img.png',
        service: 'post-construction-cleaning',
        description:
          'This service offers a thorough clean up of the building after construction.',
      },
      {
        image: 'assets/office-cleaning-img.png',
        service: 'office-cleaning ',
        description:
          'Lets help you clean and organize your office while you focus on your work.',
      },
      {
        image: 'assets/laundry-img.png',
        service: 'laundry',
        description: '',
      },
      {
        image: 'assets/errand-img.png',
        service: 'errands',
        description: '',
      },
      {
        image: 'assets/fumigation-img.png',
        service: 'fumigation',
        description: '',
      },
    ];
  }

  routeToService(service: string){
    this.router.navigate(['/eatse/services/' + service]);
  }

}
