import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from './models/new-user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './model/user';
import { ResourceCreated } from '../global-resource/models/resource-created.model';
import { PasswordReset } from './models/password-reset';
import { PasswordChange } from './models/password-change';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: any;

  constructor(private router: Router, private http: HttpClient) {}

  getCurrentUser(): User {
    return this.currentUser;
  }

  createNewClientAccount(newUser: NewUser): Observable<ResourceCreated> {
    return this.http.post<ResourceCreated>(
      `${environment.developmentIP}/auth/client-registration`,
      newUser
    );
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  saveTokens(access_token: string, refresh_token: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  loginClient(newUser: any): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/auth/client`,
      newUser
    ).pipe();
  }

  verifyClientEmail(token: ResourceCreated): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/auth/verify-client-email/${token.id}`,
      token
    );
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>(
      `${
        environment.developmentIP
      }/auth/refresh-token/${this.getRefreshToken()}`
    );
  }

  forgotPassword(data: PasswordReset): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/auth/password-reset-link`,
      data
    );
  }

  changePassword(data: PasswordChange): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/auth/reset-password`,
      data
    );
  }

  clearTokens() {
    //localStorage.removeItem('access_token');
    //localStorage.removeItem('refresh_token');
    localStorage.clear();
  }

  signOut(): Observable<any> {
    return this.http.get<string>(`${environment.developmentIP}/auth/signout-client/${this.getAccessToken()}`);
  }
}
