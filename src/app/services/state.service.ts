import { Injectable } from "@angular/core";


@Injectable({providedIn:'root'})
export class StateService {
    private leagueCountries: {countryName:string,
        leagueName:string,
        leagueId:number}[] = [
          {countryName:"England",leagueName:"Premier League",leagueId:39},
          {countryName:"Spain",leagueName:"La Liga",leagueId:107},
          {countryName:"France",leagueName:"Ligue 1",leagueId:61},
          {countryName:"Germany",leagueName:"Bundesliga",leagueId:78},
          {countryName:"Italy",leagueName:"Serie A",leagueId:71}
      ]

    getLeagueId(country:string)
    {
        return this.leagueCountries.find(obj => obj.countryName == country)?.leagueId;   
    }

    getLeagueCountries()
    {
        return this.leagueCountries;
    }

}