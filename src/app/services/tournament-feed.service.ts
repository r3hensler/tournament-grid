import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { STATIC_TOURNAMENTS } from '../models/static-tournament';

export const GEOLOCATION_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
export const TEMPERATURE_BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"

const smallViewPort = window.matchMedia("(max-device-width: 640px)");

const GreenYellowRed = (temp) => {
    
    let num: number,
        redColor: number,
        greenColor: number,
        blueColor:number = 0;

    if (temp < 0) {
        num = 0;
    } else if (temp >= 40) {
        num = 99;
    } else {
        num = temp * 2.5;
    }

    if (num < 50) {
        // green to yellow
        redColor = Math.floor(255 * (num / 50));
        greenColor = 255;

    } else {
        // yellow to red
        redColor = 255;
        greenColor = Math.floor(255 * ((50 - num % 50) / 50));
    }

    return `${redColor},${greenColor},${blueColor}`;
};

@Injectable()
export class TournamentFeedService {

    constructor(private http: Http) {
        console.log("RGB of 10", GreenYellowRed(10));
    }

    private tournaments$ = Observable.from(STATIC_TOURNAMENTS);

    private geoUrls$ = this.tournaments$
        .map((tournament: any) => {
            let tournamentObj = {
                city: tournament.city,
                colour: undefined,
                identifier: tournament.identifier,
                location: undefined,
                startDate: tournament.startDate,
                temperature: undefined,
                tournamentName: tournament.tournamentName,
                geoUrl: "",
                tempUrl: ""
            };
            let queryParam = tournament.city + " " + tournament.location;
            tournamentObj.geoUrl = GEOLOCATION_BASE_URL + encodeURIComponent(queryParam);
            return tournamentObj;
        });

    private geolocations$ = this.geoUrls$
        .filter(() => !smallViewPort.matches)
        .flatMap((tournamentObj: any): Observable<any> => {
            return this.http.get(tournamentObj.geoUrl)
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

    private temperature$ = this.geolocations$
        .flatMap((tournamentObj: any) => {
            let lat = tournamentObj.location.lat;
            let lon = tournamentObj.location.lng;
            tournamentObj.tempUrl = TEMPERATURE_BASE_URL + 'lat=' + lat + '&lon=' + lon + '&APPID=e57810fe42b72a89442a25832b5ce023';
            return this.http.get(tournamentObj.tempUrl)
                .filter((response: any) => response !== undefined)
                .map((response: any) => response.json())
                .filter((respJson: any) => respJson.main !== undefined)
                .map((respJson: any) => parseInt(respJson.main.temp, 10) - 273)
                .map((temp: number) => {
                    tournamentObj.colour = GreenYellowRed(temp);
                    tournamentObj.temperature = temp.toString() + 'C';
                    return tournamentObj;
                });
        });

    private combineLocations$ = this.temperature$.concat(this.geoUrls$)
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
