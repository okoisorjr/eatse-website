import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveInOutComponent } from './move-in-out.component';

describe('MoveInOutComponent', () => {
  let component: MoveInOutComponent;
  let fixture: ComponentFixture<MoveInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveInOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
