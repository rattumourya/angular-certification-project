import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StandingType } from "../interfaces/standings.interface";
import { fixureType } from "../interfaces/fixtures.interface";


@Injectable({ providedIn: 'root' })
export class HttpServices {
  constructor(private http: HttpClient) {}

  private httpOptions() {
    const header = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '8de761f583d6c5b96528c1601f56ba2d',
      }),
    };
    return header;
  }

  private getCurrentSeason() {
    const currentDate: Date = new Date();
    return 2023;
  }

  getStandingsOfTopLeague(leagueId: number) {
    return this.http.get<StandingType>(
      `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${this.getCurrentSeason()}`,
       this.httpOptions()
    );
  }

  getGameResults(teamId: number, resultCount: number) {
    return this.http.get<fixureType>(
        `https://v3.football.api-sports.io/fixtures?season=${this.getCurrentSeason()}&team=${teamId}&last=${resultCount}`,
         this.httpOptions()
    );
  }
}

