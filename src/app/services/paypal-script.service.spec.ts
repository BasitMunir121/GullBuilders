import { TestBed } from '@angular/core/testing';

import { PayPalScriptService } from './paypal-script.service';

describe('PaypalScriptService', () => {
  let service: PayPalScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayPalScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
