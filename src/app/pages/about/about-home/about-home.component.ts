import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-about-home',
  templateUrl: './about-home.component.html',
  styleUrls: ['./about-home.component.css']
})
export class AboutHomeComponent implements OnInit {

  constructor(private router: Router, private globalService: GlobalResourceService) { }

  ngOnInit(): void {
    console.log(this.globalService.getPreviousUrl());
  }

  gotoContact(){
    this.router.navigate(['/contact']);
  }

}
