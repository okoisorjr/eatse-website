import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  GlobalResourceService,
  Services,
} from 'src/app/global-resource/global-resource.service';
import { EatseServicesService } from 'src/app/services/eatse-services.service';

@Component({
  selector: 'app-eatse-services',
  templateUrl: './eatse-services.component.html',
  styleUrls: ['./eatse-services.component.css'],
  animations: [
    trigger('show_text', [
      transition(':enter', [
        style({ transform: 'translateY(-10%)' }),
        animate('0.5s ease-in'),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('1.5s ease-in'),
      ]),
    ]),

    trigger('slide_in', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('1s'),
      ]),
    ]),
  ],
})
export class EatseServicesComponent implements OnInit {
  services: Services[] = [];
  @ViewChild('intersectionContainer') intersectionContainer!: ElementRef;

  constructor(
    private globalServices: GlobalResourceService,
    private eatseServices: EatseServicesService,
    private router: Router
  ) {}

  mouseEnter($event: MouseEvent, service: Services) {
    service.hover = true;
  }

  mouseLeave($event: Event, service: Services) {
    service.hover = false;
  }

  /* observerCallBack(entries: any, observer: any) {
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      if (entry.isIntersecting && entry.target.id === 'intersection') {
        entry.target.className.remove('hidden');
        console.log('intersecting');
      }
    }
  } */

  ngAfterViewInit() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    /* let observer = new IntersectionObserver(
      this.observerCallBack.bind(this),
      options
    );
    observer.observe(this.intersectionContainer.nativeElement); */
  }

  ngOnInit(): void {
    //const storage = getStorage();
    //this.globalServices.fetchServices().then((doc) => {
    /* doc.forEach((element) => {
        let pathRef = ref(storage, `service-images/${element.imgPath}`); //set the download url path from firebase storage
        getDownloadURL(pathRef).then((url) => {
          element.imgPath = url;
          this.services.push(element);     
          console.log(this.services);
        }); */
    /* this.services = doc;
        console.log(this.services); */
    //})
    //});
    this.eatseServices.fetchServices().subscribe(
      (value) => {
        value.forEach((service: Services) => {
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
    this.router.navigate(['/services/' + service]);
  }
}
