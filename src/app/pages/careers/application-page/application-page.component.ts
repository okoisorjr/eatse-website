import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css'],
})
export class ApplicationPageComponent implements OnInit {
  file: any;


  constructor(private careerService: CareerService) {}

  ngOnInit(): void {}

  submitApplication(applicationForm: any) {
    this.careerService.apply()
  }
}
