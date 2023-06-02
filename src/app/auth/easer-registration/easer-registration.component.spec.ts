import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaserRegistrationComponent } from './easer-registration.component';

describe('EaserRegistrationComponent', () => {
  let component: EaserRegistrationComponent;
  let fixture: ComponentFixture<EaserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaserRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EaserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
