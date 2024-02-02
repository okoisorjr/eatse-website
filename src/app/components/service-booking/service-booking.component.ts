import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from 'src/app/global-resource/global-resource.service';
import { EatseServicesService } from 'src/app/services/eatse-services.service';

@Component({
  selector: 'app-service-booking',
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.css'],
})
export class ServiceBookingComponent implements OnInit {
  @Input() incoming!: string;
  @Output() sendClick = new EventEmitter();

  services: Services[] = [];
  constructor(
    private router: Router,
    private eatseServices: EatseServicesService
  ) {}

  ngOnInit(): void {
    this.eatseServices.fetchServices().subscribe(
      (value) => {
        value.forEach((service) => {
          if (service.category === 'cleaning') {
            this.services.push(service);
          }
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  routeToService(service: string) {
    if (this.incoming === 'booking') {
      this.sendClick.emit(service);
    } else {
      this.router.navigate(['services', service]);
    }
  }
}
