import { Component, OnInit } from '@angular/core';
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
  step: number = 1;
  confirmPassword!: string;
  newEaser: NewEaser = new NewEaser();
  error: string = '';
  submitted: boolean = false;
  states: string[] = [];
  banks: string[] = [];
  accountDetails: BankDetails = new BankDetails();

  constructor(
    private currentUser: GlobalResourceService,
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
  }

  gotoPrivacyPolicy(){
    this.router.navigate(['/our-policy']);
  }

  gotoTermsAndConditions(){
    this.router.navigate(['/terms-of-service']);
  }
}
