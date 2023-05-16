import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from './models/user-account.model';
import { LoginDetails } from './models/login-details.model';
import { ResourceCreated } from '../global-resource/models/resource-created.model';
import { NewUser } from './models/new-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverIP: string = 'http://192.168.0.180';

  constructor(private http: HttpClient) {}

  registerAccount(newUser: NewUser): Observable<ResourceCreated> {
    return this.http.post<ResourceCreated>(
      `https://${this.serverIP}/account/create-account`,
      newUser
    );
  }

  login(userInfo: LoginDetails): Observable<UserAccount> {
    console.log(userInfo, 'user-info');
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post<UserAccount>(
      `${this.serverIP}/account/login`,
      userInfo
    );
  }
}
