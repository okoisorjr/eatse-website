import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBookingPageComponent } from './service-booking-page.component';

describe('ServiceBookingPageComponent', () => {
  let component: ServiceBookingPageComponent;
  let fixture: ComponentFixture<ServiceBookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceBookingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
