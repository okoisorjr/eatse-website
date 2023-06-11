import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, serverTimestamp,  } from '@angular/fire/firestore';
import { NewOffice } from 'src/app/pages/bookings/model/new-office.model';

@Component({
  selector: 'app-office-cleaning',
  templateUrl: './office-cleaning.component.html',
  styleUrls: ['./office-cleaning.component.css']
})
export class OfficeCleaningComponent implements OnInit {
  newOfficeBooking: NewOffice = new NewOffice();

  constructor(private router: Router, private fs: Firestore, private auth: Auth) { }

  ngOnInit(): void {
  }

  gotoBooking(){
    this.router.navigate(['/booking']);
  }

  bookAppointment(){
    const dbRef = collection(this.fs, 'offices');
    addDoc(dbRef, {...this.newOfficeBooking, createdAt: serverTimestamp(), lastModified: serverTimestamp(), userId: this.auth.currentUser?.uid })
    .then((res) => {
      if(res){
        console.log(res);
      }
    })
    .catch(error => {
      console.log(error);
    });

    
  }

}
