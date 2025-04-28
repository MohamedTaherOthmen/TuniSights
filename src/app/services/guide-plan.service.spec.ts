import { TestBed } from '@angular/core/testing';

import { GuidePlanService } from './guide-plan.service';

describe('GuidePlanService', () => {
  let service: GuidePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuidePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
