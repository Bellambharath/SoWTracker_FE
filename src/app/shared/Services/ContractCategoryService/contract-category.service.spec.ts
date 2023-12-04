import { TestBed } from '@angular/core/testing';

import { ContractCategoryService } from './contract-category.service';

describe('ContractCategoryService', () => {
  let service: ContractCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
