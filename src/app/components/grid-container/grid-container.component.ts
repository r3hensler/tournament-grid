import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { TournamentFeedService } from '../../services/tournament-feed.service';

@Component({
    selector: 'app-grid-container',
    templateUrl: './grid-container.component.html',
    styleUrls: ['./grid-container.component.css']
})
export class GridContainerComponent implements OnInit {

    tournaments: any[];

    constructor(
        private sanitizer: DomSanitizer,
        private tournamentFeed: TournamentFeedService) {
        tournamentFeed.getFeed().subscribe((tournaments: any[]) => {
            this.tournaments = tournaments;
        })
    }

    ngOnInit() {
    }

    changeBackground(bgcolor: string): SafeStyle {
        let styleString = "background-color: rgba(" + bgcolor + ", 0.2);";
        return this.sanitizer.bypassSecurityTrustStyle(styleString);
    }
}
