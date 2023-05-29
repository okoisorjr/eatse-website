import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { NewUser } from '../models/new-user.model';
import { addDoc, Firestore, collection, setDoc, doc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  confirmPassword!: string;
  newUser: NewUser = new NewUser();
  uid: string = '';
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private auth: Auth,
    private currentUser: GlobalResourceService,
    private fs: Firestore,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(form: any) {
    this.submitted = true;
    console.log(form.value);
    createUserWithEmailAndPassword(
      this.auth,
      this.newUser.email,
      this.newUser.password
    )
      .then((res) => {
        let userInfo = {...this.newUser, id: res.user.uid}
        const dbInstance = collection(this.fs, 'clients');
        setDoc(doc(dbInstance, 'clients'), userInfo, { merge: true})
        addDoc(dbInstance, userInfo, )
          .then((res) => {
            this.submitted = false;
            this.router.navigate(['/auth/registration-success']);
          })
          .catch((error) => {
            console.log(error);
            this.submitted = false;
          });
      })
      .catch((error) => {
        console.log(error);
      });

    /* this.authService.registerAccount(this.newUser).subscribe(
      (value) => {
        if (value) {
          console.log(value);
          this.router.navigate(['/auth/registration-success']);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.notifier.notify('error', `${error.error.msg}`);
      }
    ); */
  }
}
