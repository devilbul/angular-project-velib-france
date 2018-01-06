import { TestBed, inject } from '@angular/core/testing';

import { JcdecauxService } from './jcdecaux.service';

describe('JcdecauxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JcdecauxService]
    });
  });

  it('should be created', inject([JcdecauxService], (service: JcdecauxService) => {
    expect(service).toBeTruthy();
  }));
});
