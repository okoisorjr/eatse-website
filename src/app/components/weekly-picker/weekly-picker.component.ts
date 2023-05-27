import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weekly-picker',
  templateUrl: './weekly-picker.component.html',
  styleUrls: ['./weekly-picker.component.css']
})
export class WeeklyPickerComponent implements OnInit {

  @Input() frequency!: string;

  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker = true;
  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];
  selectedDays: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initDate();
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(
      this.year,
      this.month,
      today.getDate()
    ).toDateString();
  }

  selectDay(day: string){
    if(!this.selectedDays.includes(day)){
      this.selectedDays.push(day);
      console.log(this.selectedDays);
    }else{
      this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
      console.log(this.selectedDays);
    }
    
    
    console.log(this.selectedDays);
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

}
