/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentFeedService } from './tournament-feed.service';

describe('TournamentFeedService', () => {
    let tournamentFeedService: TournamentFeedService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TournamentFeedService]
        });
    });

    beforeEach(inject([TournamentFeedService], (tfs: TournamentFeedService) => {
        tournamentFeedService = tfs;
    }));


    it('should exist', () => {
        expect(tournamentFeedService.getFeed).toBeDefined();
    });


});
