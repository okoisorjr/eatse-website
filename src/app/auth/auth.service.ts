import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from './models/new-user.model';
import {
  addDoc,
  Firestore,
  collection,
  doc,
  collectionData,
  DocumentData,
  where,
} from '@angular/fire/firestore';
import {
  Auth,
  User,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
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
  constructor(
    private auth: Auth,
    private user: GlobalResourceService,
    private fs: Firestore,
    private router: Router
  ) {}

  async registerUser(newUser: NewUser) {
    let user = await createUserWithEmailAndPassword(
      this.auth,
      newUser.email,
      newUser.password
    );
    if (user) {
      await sendEmailVerification(user.user);
      await updateProfile(user.user, {
        displayName: newUser.firstname + ' ' + newUser.lastname,
      });
      this.auth.signOut();
      this.router.navigate(['auth', 'registration-success']);
    }
    /* .then((res) => {
        let done = await 
        updateProfile(res.user, {
          displayName: newUser.firstname + ' ' + newUser.lastname,
        });
      })
      .catch((error) => {
        console.log(error);
      }); */
  }

  signInUser(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        this.user.currentUser = res;
        if(res.user.emailVerified === false){
          sendEmailVerification(res.user);
        }
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/auth/sign-in']);
    //location.reload();
  }

  getClient(): Observable<DocumentData> {
    const clientRef = collection(this.fs, 'clients');
    return collectionData(clientRef, {
      idField: 'id',
    }) as Observable<DocumentData>;
  }
}
