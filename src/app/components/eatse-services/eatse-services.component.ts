import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import {
  GlobalResourceService,
  Services,
} from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-eatse-services',
  templateUrl: './eatse-services.component.html',
  styleUrls: ['./eatse-services.component.css'],
})
export class EatseServicesComponent implements OnInit {
  services: Services[] = [];

  constructor(
    private globalServices: GlobalResourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storage = getStorage();
    this.globalServices.fetchServices().then((doc) => {
      doc.forEach((element) => {
        let pathRef = ref(storage, `service-images/${element.imgPath}`); //set the download url path from firebase storage
        getDownloadURL(pathRef).then((url) => {
          element.imgPath = url;
          this.services.push(element);        
        });
      })
    });
  }

  routeToService(service: string) {
    this.router.navigate(['/services/' + service]);
  }
}
