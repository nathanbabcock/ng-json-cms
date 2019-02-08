import { TestBed } from '@angular/core/testing';

import { NgJsonCmsService } from './ng-json-cms.service';

describe('NgJsonCmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgJsonCmsService = TestBed.get(NgJsonCmsService);
    expect(service).toBeTruthy();
  });
});
