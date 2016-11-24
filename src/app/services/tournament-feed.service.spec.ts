/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { GEOLOCATION_BASE_URL, TournamentFeedService } from './tournament-feed.service';
import { STATIC_TOURNAMENTS } from '../models/static-tournament';

const GEO_RESULT = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "Guayaquil",
                    "short_name": "Guayaquil",
                    "types": ["locality", "political"]
                },
                {
                    "long_name": "Guayas",
                    "short_name": "Guayas",
                    "types": ["administrative_area_level_1", "political"]
                },
                {
                    "long_name": "Ecuador",
                    "short_name": "EC",
                    "types": ["country", "political"]
                }
            ],
            "formatted_address": "Guayaquil, Ecuador",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": -2.0173767,
                        "lng": -79.8607222
                    },
                    "southwest": {
                        "lat": -2.2873981,
                        "lng": -80.09900090000001
                    }
                },
                "location": {
                    "lat": -2.1709979,
                    "lng": -79.9223592
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": -2.0176044,
                        "lng": -79.8608182
                    },
                    "southwest": {
                        "lat": -2.2873981,
                        "lng": -80.09900090000001
                    }
                }
            },
            "place_id": "ChIJX4BV6MsTLZARc6T89JKkFYA",
            "types": ["locality", "political"]
        }
    ],
    "status": "OK"
};

describe('TournamentFeedService', () => {
    let tournamentFeedService: TournamentFeedService,
        mockBackend: MockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: (backend, options) =>
                    { return new Http(backend, options); },
                    deps: [MockBackend, BaseRequestOptions]
                },
                TournamentFeedService
            ]
        });
    });

    beforeEach(inject([TournamentFeedService, MockBackend],
        (tfs: TournamentFeedService, mb: MockBackend) => {
            tournamentFeedService = tfs;
            mockBackend = mb;
        }
    ));


    it('getFeed should call geolocation url', fakeAsync(() => {
        let receivedResponse: any[];
        let connection: MockConnection;

        let responses = [];
        responses.push(new Response(new ResponseOptions({body: GEO_RESULT})));
        responses.push(new Response(new ResponseOptions({body: GEO_RESULT})));

        mockBackend.connections
            .subscribe((c: MockConnection) => {
                let response = responses.shift();
                connection = c;
                connection.mockRespond(response);
            });
            
        tournamentFeedService.getFeed()
            .subscribe((tournamentList: any[]) => {
                receivedResponse = tournamentList;
            });

        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toContain(GEOLOCATION_BASE_URL);
        expect(receivedResponse.length).toBe(13);
        expect(receivedResponse[1].location)
            .toEqual(GEO_RESULT.results[0].geometry.location);
    }));
});
