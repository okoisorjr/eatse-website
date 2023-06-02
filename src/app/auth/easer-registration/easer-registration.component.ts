import { Component, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { NewEaser } from '../model/new-easer.model';
import { BankDetails } from '../model/bank-details.model';

@Component({
  selector: 'app-easer-registration',
  templateUrl: './easer-registration.component.html',
  styleUrls: ['./easer-registration.component.css'],
})
export class EaserRegistrationComponent implements OnInit {
  step: number = 2;
  confirmPassword!: string;
  newEaser: NewEaser = new NewEaser();
  error: string = '';
  submitted: boolean = false;
  states: string[] = [];
  banks: string[] = [];
  accountDetails: BankDetails = new BankDetails();

  constructor(
    private auth: Auth,
    private currentUser: GlobalResourceService,
    private fs: Firestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.states = [
      'Abia',
      'Adamawa',
      'Akwa Ibom',
      'Anambra',
      'Bauchi',
      'Bayelsa',
      'Benue',
      'Borno',
      'Cross River',
      'Delta',
      'Ebonyi',
      'Edo',
      'Ekiti',
      'Enugu',
      'Federal Capital Territory',
      'Gombe',
      'Imo',
      'Jigawa',
      'Kaduna',
      'Kano',
      'Katsina',
      'Kebbi',
      'Kogi',
      'Kwara',
      'Lagos',
      'Nasarawa',
      'Niger',
      'Ogun',
      'Ondo',
      'Osun',
      'Oyo',
      'Plateau',
      'Rivers',
      'Sokoto',
      'Taraba',
      'Yobe',
      'Zamfara',
    ];

    this.banks = [
      'ZenithBank',
      'Guaranty Trust Bank (GTB)',
      'United Bank for Africa (UBA)',
      'Stanbic IBTC',
      'Fidelity Bank',
      'Access Bank',
      'Jaiz Bank',
      'FirstBank',
      'Heritage Bank',
      'Union Bank',
      'FCMB',
      'DIAMOND BANK',
      'WEMA BANK',
    ];
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  showSelectedState(event: any) {
    this.newEaser.residentState = event.target.value;
    console.log(this.newEaser);
  }

  showSelectedBank(event: any) {
    this.accountDetails.bank = event.target.value;
    console.log(this.newEaser);
  }

  registerEaser(form: any) {
    this.error = '';
    this.submitted = true;
    console.log(this.newEaser);
    createUserWithEmailAndPassword(
      this.auth,
      this.newEaser.email,
      this.newEaser.password
    )
      .then((res) => {
        this.submitted = false;
        let userInfo = { ...this.newEaser, id: res.user.uid };
        const dbInstance = collection(this.fs, 'easers');
        updateProfile(res.user, {
          displayName: this.newEaser.firstname + ' ' + this.newEaser.lastname,
        });
        //sendEmailVerification(res.user);
        //setDoc(doc(dbInstance, 'clients'), userInfo, { merge: true});
        addDoc(dbInstance, userInfo)
          .then((res) => {
            const accountDetailsRef = collection(
              this.fs,
              `easers/${res.id}/bankDetails`
            );
            addDoc(accountDetailsRef, {
              ...this.accountDetails,
              userId: this.auth.currentUser?.uid,
            });
            this.auth.signOut();
            this.router.navigate(['/auth/easer-success']);
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
