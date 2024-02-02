import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { BuildingTypes } from 'src/app/shared/building-types';

@Component({
  selector: 'app-building-type',
  templateUrl: './building-type.component.html',
  styleUrls: ['./building-type.component.css']
})
export class BuildingTypeComponent implements OnInit {
  @Input() booking!: NewBooking;
  @Output() setBuildingType = new EventEmitter();

  buildingTypes: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.buildingTypes = [
      {img: 'assets/eatse/house.png', type: BuildingTypes.HOUSE},
      {img: 'assets/eatse/office.png', type: BuildingTypes.OFFICE},
    ];
  }

  selectBuildingType(type: any) {
    this.booking.buildingType = type;
  }

  next() {
    this.setBuildingType.emit(this.booking);
  }

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

}
