import { Component, OnInit } from '@angular/core';
import { ContactEatseService } from 'src/app/services/contact-eatse.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  fullname!: string;
  email!: string;
  phone!: string;
  message!: string;
  currentUser: any;

  constructor() {}

  ngOnInit(): void {}

  submitForm(form: any) {
    console.log(form.value);
  }
}
