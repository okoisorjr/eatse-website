import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

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

  constructor(private fs: Firestore, private auth: Auth) { }

  sendMessage(contactData: ContactData, userId: any){
    const contactsRef = collection(this.fs, 'contacts');
    addDoc(contactsRef, {contactData, userId: userId})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
