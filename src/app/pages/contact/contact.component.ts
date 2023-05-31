import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CurrentUser } from 'src/app/auth/auth.service';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { ContactEatseService } from 'src/app/services/contact-eatse.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  fullname!: string;
  email!: string;
  phone!: string;
  message!: string;
  currentUser: any;

  constructor(private auth: Auth, private contactService: ContactEatseService) { 
    this.auth.onAuthStateChanged((credential) => {
      if(credential){
        this.currentUser = credential;
      }
    })
  }

  ngOnInit(): void {
    this.email = this.currentUser.email;
    this.fullname = this.currentUser.displayName;
  }

  submitForm(form: any){
    console.log(form.value);
    this.contactService.sendMessage(form.value);
  }

}
