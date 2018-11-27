import { TestBed, inject } from '@angular/core/testing';

import { ArticlePullService } from './http.service';

describe('ArticlePullService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlePullService]
    });
  });

  it('should be created', inject([ArticlePullService], (service: ArticlePullService) => {
    expect(service).toBeTruthy();
  }));
});
