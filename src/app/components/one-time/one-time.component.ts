import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-one-time',
  templateUrl: './one-time.component.html',
  styleUrls: ['./one-time.component.css']
})
export class OneTimeComponent implements OnInit {

  frequencies: string[] = [];
  selectedFrequency!: string;

  constructor() { }

  ngOnInit(): void {
    this.frequencies = ['one-time', 'weekly', 'monthly', 'custom'];
  }

  selectFrequency(frequency: any){
    this.selectedFrequency = 'boy';
  }

}
