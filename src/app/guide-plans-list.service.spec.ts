import { TestBed } from '@angular/core/testing';

import { GuidePlansListService } from './guide-plans-list.service';

describe('GuidePlansListService', () => {
  let service: GuidePlansListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuidePlansListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
