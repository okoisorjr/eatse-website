import { TestBed } from '@angular/core/testing';

import { TokenMgtService } from './token-mgt.service';

describe('TokenMgtService', () => {
  let service: TokenMgtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenMgtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
