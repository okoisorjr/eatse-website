import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestimoniesService {
  constructor(private http: HttpClient) {}

  fetchTestimonies(): Observable<any> {
    return this.http.get<any>(`${environment.developmentIP}/feedbacks`);
  }
}
