/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { GridContainerComponent } from './components/grid-container/grid-container.component';
import { TournamentFeedService } from './services/tournament-feed.service';

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

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                {
                    provide: TournamentFeedService, 
                    useClass: MockTournamentFeedService
                }
            ],
            declarations: [
                AppComponent,
                GridContainerComponent
            ],
        });
    });

    it(`should have as title 'Upcoming Tournaments'`, async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Upcoming Tournaments');
    }));

    it('should render title in a h1 tag', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Upcoming Tournaments');
    }));
});
