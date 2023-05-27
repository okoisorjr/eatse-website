import { Component, OnInit } from '@angular/core';
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
  user!: CurrentUser;

  constructor(private currentUser: GlobalResourceService, private contactService: ContactEatseService) { }

  ngOnInit(): void {
    this.user = this.currentUser.currentUser;

    this.email = this.user.email;
    this.fullname = this.user.firstname + ' ' + this.user.lastname;
    this.phone = this.user.phone;
  }

  submitForm(form: any){
    console.log(form.value);
    this.contactService.sendMessage(form.value);
  }

}
