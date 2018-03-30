import { TestBed, inject } from '@angular/core/testing';

import { BlackjackService } from './blackjack.service';

describe('BlackjackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlackjackService]
    });
  });

  it('should be created', inject([BlackjackService], (service: BlackjackService) => {
    expect(service).toBeTruthy();
  }));
});
