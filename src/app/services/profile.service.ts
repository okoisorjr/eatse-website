import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressData } from '../pages/profile/address-data';
import { ResourceCreated } from '../global-resource/models/resource-created.model';
import { ClientEaser } from '../auth/models/user-account.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  fetchClientAddresses(client_id: string): Observable<AddressData[]> {
    return this.http.get<AddressData[]>(
      `${environment.developmentIP}/address/${client_id}/address`
    );
  }

  fetchClientEaser(client_id: string): Observable<ClientEaser[]> {
    return this.http.get<ClientEaser[]>(
      `${environment.developmentIP}/clients/${client_id}/assigned_easer`
    );
  }

  fetchClientNotifications(role: string): Observable<any> {
    return this.http.get<any>(
      `${environment.developmentIP}/notifications/${role}`
    );
  }

  createAddress(newAddress: AddressData): Observable<AddressData> {
    return this.http.post<AddressData>(
      `${environment.developmentIP}/address`,
      newAddress
    );
  }

  updateAddress(
    address_id: string,
    address: AddressData
  ): Observable<AddressData> {
    return this.http.patch<AddressData>(
      `${environment.developmentIP}/address/${address_id}`,
      address
    );
  }

  uploadProfileImg(data: FormData, client_id: string): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/client/${client_id}/save/profile_pic`,
      data
    );
  }
}
