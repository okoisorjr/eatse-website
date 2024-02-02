import { Component, OnInit } from '@angular/core';
import { EatseServicesService } from 'src/app/services/eatse-services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentUser: any;
  services: any[] = [];

  constructor(private eatseServices: EatseServicesService) {}

  ngOnInit(): void {
    this.eatseServices.fetchServices().subscribe((value) => {
      value.forEach((service: any) => {
        if (service.category === 'cleaning') {
          this.services.push(service);
        }
      });
    });
  }
}
