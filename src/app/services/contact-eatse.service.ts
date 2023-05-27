import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

export interface ContactData{
  fullname: string;
  email: string;
  phone: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactEatseService {

  constructor(private fs: Firestore, private auth: Auth) { }

  sendMessage(contactData: ContactData){
    const contactsRef = collection(this.fs, 'contacts');
    addDoc(contactsRef, contactData)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
