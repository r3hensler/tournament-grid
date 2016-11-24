import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { STATIC_TOURNAMENTS } from '../models/static-tournament';

export const GEOLOCATION_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

@Injectable()
export class TournamentFeedService {

    constructor(private http: Http) { }

    private tournaments$ = Observable.from(STATIC_TOURNAMENTS);

    private geoUrls$ = this.tournaments$
        .map((tournament: any) => {
            let tournamentObj = {
                city: tournament.city,
                identifier: tournament.identifier,
                location: undefined,
                startDate: tournament.startDate,
                tournamentName: tournament.tournamentName,
                url: ""
            };
            let queryParam = tournament.city + " " + tournament.location;
            tournamentObj.url = GEOLOCATION_BASE_URL + encodeURIComponent(queryParam);
            return tournamentObj;
        });

    private geolocations$ = this.geoUrls$
        .flatMap((tournamentObj: any): Observable<any> => {
            return this.http.get(tournamentObj.url)
                .filter((response: any) => response !== undefined)
                .map((response: any) => response.json())
                .map((respJson: any) => respJson.results)
                .map((results: any[]) => results.slice(0, 1).pop())
                .filter((geoObj: any) => geoObj !== undefined)
                .map((geoObj: any) => geoObj.geometry.location)
                .map((location: any) => {
                    tournamentObj.location = location;
                    return tournamentObj;
                });
        });

    private combineLocations$ = this.geolocations$.concat(this.geoUrls$)
        .distinct((tournamentObj1: any, tournamentObj2: any) => 
            tournamentObj1.identifier === tournamentObj2.identifier);

    private sumTournaments$ = this.combineLocations$
        .scan((tournamentList: any[], tournament: any) => {
            return [...tournamentList, tournament];
        }, []);

    getFeed(): Observable<any[]> {
        return this.sumTournaments$;
    }
}
