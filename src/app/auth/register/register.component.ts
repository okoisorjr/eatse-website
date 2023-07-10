import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { NewUser } from '../models/new-user.model';
import {
  addDoc,
  serverTimestamp,
  Firestore,
  collection,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateCurrentUser,
  updatePhoneNumber,
  updateProfile,
} from '@angular/fire/auth';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  confirmPassword!: string;
  newUser: NewUser = new NewUser();
  error: string = '';
  submitted: boolean = false;

  constructor(
    private auth: Auth,
    private currentUser: GlobalResourceService,
    private fs: Firestore,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(form: any) {
    this.error = '';
    this.submitted = true;
    console.log(form.value);
    createUserWithEmailAndPassword(
      this.auth,
      this.newUser.email,
      this.newUser.password
    )
      .then((res) => {
        this.submitted = false;
        let userInfo = { ...this.newUser, id: res.user.uid, easerId: null, createdAt: serverTimestamp(), lastModified: serverTimestamp() };
        const dbInstance = doc(this.fs, 'clients', res.user.uid);
        updateProfile(res.user, {
          displayName: this.newUser.firstname + ' ' + this.newUser.lastname,
        });
        sendEmailVerification(res.user);
        //setDoc(doc(dbInstance, 'clients'), userInfo, { merge: true});
        setDoc(dbInstance, userInfo)
          .then((res) => {
            this.auth.signOut();
            this.router.navigate(['/auth/registration-success']);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        this.submitted = false;
        this.error = error.message;
        console.log(error.errors[0].message);
      });
  }
}
