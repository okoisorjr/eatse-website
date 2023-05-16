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

  constructor(private globalServices: GlobalResourceService, private router: Router) {}

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

    this.globalServices.fetchServices().subscribe(
      (value) => {
        this.eatseServices = value;
        console.log(this.eatseServices);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  routeToService(service: string){
    this.router.navigate(['/eatse/services/' + service]);
  }
}
