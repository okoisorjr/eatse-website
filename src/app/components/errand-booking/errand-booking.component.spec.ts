import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandBookingComponent } from './errand-booking.component';

describe('ErrandBookingComponent', () => {
  let component: ErrandBookingComponent;
  let fixture: ComponentFixture<ErrandBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrandBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
