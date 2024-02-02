import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/services/career.service';
import { NewApplication } from '../models/new-application';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css'],
})
export class ApplicationPageComponent implements OnInit {
  file!: File;
  filename!: string;
  formData!: FormData;
  application: NewApplication = new NewApplication();

  constructor(private careerService: CareerService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      this.filename = this.file.name;

      const formData = new FormData();

      formData.append('file', this.file);

      this.formData = formData;

      console.log('document to be uploaded:', this.formData);
    }
    console.log('selected file: ', event);
  }

  ngOnInit(): void {}

  submitApplication() {

    this.careerService.apply(this.formData, this.application).subscribe(
      (value) => {
        console.log(value);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
