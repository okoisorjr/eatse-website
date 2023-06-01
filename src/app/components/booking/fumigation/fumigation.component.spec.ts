import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FumigationComponent } from './fumigation.component';

describe('FumigationComponent', () => {
  let component: FumigationComponent;
  let fixture: ComponentFixture<FumigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FumigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FumigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
