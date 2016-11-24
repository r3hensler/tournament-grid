import { Component, OnInit } from '@angular/core';

import { TournamentFeedService } from '../../services/tournament-feed.service';

@Component({
    selector: 'app-grid-container',
    templateUrl: './grid-container.component.html',
    styleUrls: ['./grid-container.component.css']
})
export class GridContainerComponent implements OnInit {

    tournaments: any[];

    constructor(private tournamentFeed: TournamentFeedService) {
        tournamentFeed.getFeed().subscribe((tournaments: any[]) => {
            this.tournaments = tournaments;
        })
    }

    ngOnInit() {
    }
}
