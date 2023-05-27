import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPickerComponent } from './weekly-picker.component';

describe('WeeklyPickerComponent', () => {
  let component: WeeklyPickerComponent;
  let fixture: ComponentFixture<WeeklyPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
