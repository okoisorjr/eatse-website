import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaserSuccessComponent } from './easer-success.component';

describe('EaserSuccessComponent', () => {
  let component: EaserSuccessComponent;
  let fixture: ComponentFixture<EaserSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaserSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EaserSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
