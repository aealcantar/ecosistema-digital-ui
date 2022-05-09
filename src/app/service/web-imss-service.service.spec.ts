import { TestBed } from '@angular/core/testing';

import { WebImssService } from './web-imss-service.service';

describe('WebImssService', () => {
  let service: WebImssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebImssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
