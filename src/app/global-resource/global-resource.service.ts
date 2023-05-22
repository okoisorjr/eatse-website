import { Injectable } from '@angular/core';
import { UserAccount } from '../auth/models/user-account.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Services {
  service: string;
  description: string;
  cost: string;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalResourceService {
  currentUser!: UserAccount;
  mobileMenu: boolean = false;

  constructor(private http: HttpClient) {}

  setCurrentUser(user: UserAccount) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setMobileMenuState(currentState: boolean) {
    this.mobileMenu = currentState;
  }

  getMobileMenuState() {
    return this.mobileMenu;
  }

  fetchServices(): Observable<Services[]> {
    return this.http.get<Services[]>(`http://localhost:11000/api/v1/services`, {
      withCredentials: false,
    });
  }
}
