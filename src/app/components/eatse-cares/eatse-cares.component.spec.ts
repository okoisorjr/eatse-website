import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatseCaresComponent } from './eatse-cares.component';

describe('EatseCaresComponent', () => {
  let component: EatseCaresComponent;
  let fixture: ComponentFixture<EatseCaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EatseCaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EatseCaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
