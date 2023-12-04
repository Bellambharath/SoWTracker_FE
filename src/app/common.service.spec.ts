import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('loadComponent', () => {
    const message = false;
    service.loadMessage.subscribe((value) => {
      expect(value).toEqual(message);
    });

    service.loadComponent(message);
  });

  it('headerContent', () => {
    const content = false;
    service.HeaderContent.subscribe((value) => {
      expect(value).toBe(content);
    });

    service.headerContent(content);
  });
});
