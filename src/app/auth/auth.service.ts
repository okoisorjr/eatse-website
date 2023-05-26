import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from './models/user-account.model';
import { LoginDetails } from './models/login-details.model';
import { ResourceCreated } from '../global-resource/models/resource-created.model';
import { NewUser } from './models/new-user.model';
import { addDoc, Firestore, collection, doc, collectionData, DocumentData } from '@angular/fire/firestore';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { GlobalResourceService } from '../global-resource/global-resource.service';

export interface CurrentUser{
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverIP: string = 'http://localhost:11000/api/v1';
  currentUser: UserAccount = new UserAccount();

  constructor(private http: HttpClient, private auth: Auth, private user: GlobalResourceService, private fs: Firestore) {}

  registerAccount(newUser: NewUser): Observable<ResourceCreated> {
    return this.http.post<ResourceCreated>(
      `${this.serverIP}/account/create-account`,
      newUser
    );
  }

  registerUser(newUser: NewUser){
    createUserWithEmailAndPassword(this.auth, newUser.email, newUser.password)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  signInUser(email: string, password: string): Observable<CurrentUser[]>{
    signInWithEmailAndPassword(this.auth, email, password)
    .then((res) => {
      if(res){
        let token = '';
        this.user.userInfoId = res.user.uid;

        res.user.getIdToken()
        .then((token) => {
          token = token;
        });
        localStorage.setItem('token', token);
      }
    })
    .catch((error) => {
      console.log(error);
    })

    const clientRef = collection(this.fs, 'clients')
    return collectionData(clientRef, {idField: 'id'}) as Observable<CurrentUser[]>;
  }

  getClient(): Observable<DocumentData>{
    const clientRef = collection(this.fs, 'clients')
    return collectionData(clientRef, {idField: 'id'}) as Observable<DocumentData>;
  }

  login(userInfo: LoginDetails): Observable<any> {
    console.log(userInfo, 'user-info');
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post<any>(
      `${this.serverIP}/account/login`,
      userInfo
    );
  }
}
