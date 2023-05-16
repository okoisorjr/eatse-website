import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConstructionComponent } from './page-construction.component';

describe('PageConstructionComponent', () => {
  let component: PageConstructionComponent;
  let fixture: ComponentFixture<PageConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageConstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
