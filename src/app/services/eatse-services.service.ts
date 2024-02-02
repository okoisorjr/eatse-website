import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EatseServicesService {
  services: any[] = [];
  
  constructor(private http: HttpClient) {}

  fetchServices(): Observable<any> {
    return this.http.get<any>(`${environment.developmentIP}/eatse-services`);
  }

  fetchSingleService(service_name: string): Observable<any> {
    return this.http.get<any>(`${environment.developmentIP}/eatse-services/${service_name}`);
  }
}
