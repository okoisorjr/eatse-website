import { TestBed } from '@angular/core/testing';

import { EatseServicesService } from './eatse-services.service';

describe('EatseServicesService', () => {
  let service: EatseServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EatseServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
