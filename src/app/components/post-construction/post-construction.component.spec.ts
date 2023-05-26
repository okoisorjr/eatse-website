import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostConstructionComponent } from './post-construction.component';

describe('PostConstructionComponent', () => {
  let component: PostConstructionComponent;
  let fixture: ComponentFixture<PostConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostConstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
