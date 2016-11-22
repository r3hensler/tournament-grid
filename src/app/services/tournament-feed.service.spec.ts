/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { TournamentFeedService } from './tournament-feed.service';

describe('TournamentFeedService', () => {
    let tournamentFeedService: TournamentFeedService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
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
