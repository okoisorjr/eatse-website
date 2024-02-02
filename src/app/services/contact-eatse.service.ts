import { Injectable } from '@angular/core';

export interface ContactData{
  fullname: string;
  email: string;
  phone: string;
  message: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactEatseService {

  constructor() { }

  sendMessage(contactData: ContactData, userId: any){
    /* const contactsRef = collection(this.fs, 'contacts');
    addDoc(contactsRef, {contactData, userId: userId})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    }) */
  }
}
