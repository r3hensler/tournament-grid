/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs';

import { GridContainerComponent } from './grid-container.component';
import { TournamentFeedService } from '../../services/tournament-feed.service';

const mockFeed = [{
    "city": "test city",
    "tournamentName": "test tournament",
    "startDate": "2016-11-22"
}];

class MockTournamentFeedService {
    getFeed(): Observable<any[]> {
        return Observable.of(mockFeed);
    }
}
describe('GridContainerComponent', () => {
    let component: GridContainerComponent;
    let fixture: ComponentFixture<GridContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{
                 provide: TournamentFeedService, 
                 useClass: MockTournamentFeedService
            }],
            declarations: [GridContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should populate tournaments from TournamentFeedService', () => {
        expect(component.tournaments).toEqual(mockFeed);
    });
});
