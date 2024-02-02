import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CareerService {
  constructor(private http: HttpClient) {}

  apply(file: FormData, application: any): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/apply`,
      application
    );
  }

  uploadResume(file: FormData): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/apply/upload-cv`,
      file
    );
  }
}
