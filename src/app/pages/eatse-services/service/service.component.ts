import { Component, OnInit } from '@angular/core';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  serviceName!: string;
  service: any;
  selectedService: any;

  constructor(private router: Router, private ar: ActivatedRoute, private globalService: GlobalResourceService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
    })
    this.serviceName = this.ar.snapshot.params['id'];
    const storage = getStorage();
    this.globalService.getSingleService(this.serviceName).then((doc) => {
      let pathRef = ref(storage, `service-images/${doc.imgPath}`);
      getDownloadURL(pathRef).then((url) => {
        doc.imgPath = url;
        this.service = doc;
      });
    });
  }

  routeToBooking(){
    this.router.navigate(['/booking']);
  }
}
