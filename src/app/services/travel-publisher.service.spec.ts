import { TestBed } from '@angular/core/testing';

import { TravelPublisherService } from './travel-publisher.service';

describe('TravelPublisherService', () => {
  let service: TravelPublisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelPublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
