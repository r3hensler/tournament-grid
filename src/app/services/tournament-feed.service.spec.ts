/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentFeedService } from './tournament-feed.service';

describe('TournamentFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentFeedService]
    });
  });

  it('should ...', inject([TournamentFeedService], (service: TournamentFeedService) => {
    expect(service).toBeTruthy();
  }));
});
