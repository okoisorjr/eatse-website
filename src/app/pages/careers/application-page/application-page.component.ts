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
  filename!: string;
  formData!: FormData;
  application: NewApplication = new NewApplication();
  uploading: boolean = false;

  constructor(private careerService: CareerService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.uploading = true;
      this.filename = file.name;

      const formData = new FormData();

      formData.append('file', file);

      this.careerService.uploadResume(formData).subscribe((value) => {
        this.application.file = value.img_URL;
        console.log(this.application.file);
        this.uploading = false;
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.uploading = false;
      })
    }
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
