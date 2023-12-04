import { TestBed } from '@angular/core/testing';

import { JobcodeService } from './jobcode.service';

describe('JobcodeService', () => {
  let service: JobcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
