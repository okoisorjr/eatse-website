import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingsngclearComponent } from './list-bookingsngclear.component';

describe('ListBookingsngclearComponent', () => {
  let component: ListBookingsngclearComponent;
  let fixture: ComponentFixture<ListBookingsngclearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBookingsngclearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingsngclearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
