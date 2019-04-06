import { TestBed } from '@angular/core/testing';

import { GuardMensajesService } from './guard-mensajes.service';

describe('GuardMensajesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardMensajesService = TestBed.get(GuardMensajesService);
    expect(service).toBeTruthy();
  });
});
