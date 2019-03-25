import { TestBed } from '@angular/core/testing';

import { CanchaService } from './cancha.service';

describe('CanchaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanchaService = TestBed.get(CanchaService);
    expect(service).toBeTruthy();
  });
});
