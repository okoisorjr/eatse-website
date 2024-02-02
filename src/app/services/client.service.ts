import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  uploadProfilePic(client_id: string, file: FormData): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/clients/upload-profile/${client_id}`,
      file
    );
  }
}
