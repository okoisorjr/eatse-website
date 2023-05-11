import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatseServicesComponent } from './eatse-services.component';

describe('EatseServicesComponent', () => {
  let component: EatseServicesComponent;
  let fixture: ComponentFixture<EatseServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EatseServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EatseServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
