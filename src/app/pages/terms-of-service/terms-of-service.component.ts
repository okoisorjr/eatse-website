import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TermsAndConditionsService } from 'src/app/services/terms-and-conditions.service';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css'],
})
export class TermsOfServiceComponent implements OnInit {
  terms: any[] = [];

  constructor(private termsAndConditionsService: TermsAndConditionsService) {}

  ngOnInit(): void {
    this.termsAndConditionsService
      .fetchTermsOfService()
      .then((value) => {
        this.terms = value;
        console.log(this.terms);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
