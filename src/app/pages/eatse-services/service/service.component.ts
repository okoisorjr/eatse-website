import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { EatseServicesService } from 'src/app/services/eatse-services.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  serviceName!: string;
  service: any;
  selectedService: any;
  currentUser: any;

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private auth: AuthService,
    private eatseServices: EatseServicesService
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit(): void {
    /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    }); */

    this.ar.params.subscribe((routeParams) => {
      //this.loadUserDetail(routeParams.id);
      this.eatseServices
        .fetchSingleService(routeParams['id'])
        .subscribe((value) => {
          this.service = value;
        });
    });
  }

  routeToBooking(service: string) {
    if (this.currentUser) {
      this.router.navigate(['/booking/' + service]);
    } else {
      this.router.navigate(['auth', 'sign-in']);
    }
  }
}
