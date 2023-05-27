import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from './models/user-account.model';
import { LoginDetails } from './models/login-details.model';
import { ResourceCreated } from '../global-resource/models/resource-created.model';
import { NewUser } from './models/new-user.model';
import {
  addDoc,
  Firestore,
  collection,
  doc,
  collectionData,
  DocumentData,
} from '@angular/fire/firestore';
import {
  Auth,
  User,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from '@angular/fire/auth';
import { GlobalResourceService } from '../global-resource/global-resource.service';
import { Router } from '@angular/router';

export interface CurrentUser {
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
  currentUser: any;

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private user: GlobalResourceService,
    private fs: Firestore,
    private router: Router
  ) {}

  registerUser(newUser: NewUser) {
    createUserWithEmailAndPassword(this.auth, newUser.email, newUser.password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: newUser.firstname + ' ' + newUser.lastname,
        })
          .then((res) => {
            this.signOut();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signInUser(email: string, password: string): UserCredential {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        this.currentUser = res;
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
      
    return this.currentUser;
    
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/auth/sign-in']);
  }

  getClient(): Observable<DocumentData> {
    const clientRef = collection(this.fs, 'clients');
    return collectionData(clientRef, {
      idField: 'id',
    }) as Observable<DocumentData>;
  }
}
