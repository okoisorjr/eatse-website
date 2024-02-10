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

  fetchAllOpenings(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.developmentIP}/apply/positions/all`
    );
  }

  fetchSingleOpenPosition(role_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.developmentIP}/apply/positions/${role_id}`
    );
  }

  uploadResume(file: FormData): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/apply/upload-cv`,
      file
    );
  }
}
