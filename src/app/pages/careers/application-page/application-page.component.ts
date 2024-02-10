import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/services/career.service';
import { NewApplication } from '../models/new-application';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

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
  role_id!: string;

  constructor(
    private careerService: CareerService,
    private ar: ActivatedRoute,
    private notifier: NotifierService
  ) {
    this.role_id = this.ar.snapshot.params['role_id'];
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.uploading = true;
      this.filename = file.name;

      const formData = new FormData();

      formData.append('file', file);

      this.careerService.uploadResume(formData).subscribe(
        (value) => {
          this.application.file = value.img_URL;
          console.log(this.application.file);
          this.notifier.notify('success', value.msg);
          this.uploading = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.uploading = false;
        }
      );
    }
  }

  ngOnInit(): void {}

  submitApplication() {
    this.application.position = this.role_id;
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
