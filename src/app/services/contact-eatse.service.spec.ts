import { TestBed } from '@angular/core/testing';

import { ContactEatseService } from './contact-eatse.service';

describe('ContactEatseService', () => {
  let service: ContactEatseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactEatseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
