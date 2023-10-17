import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../services/http.service';
import { StandingType, StandingsObj } from '../../interfaces/standings.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-standing-leagues',
  templateUrl: './standing-leagues.component.html',
  styleUrls: ['./standing-leagues.component.css']
})
export class StandingLeaguesComponent implements OnInit {

  selectedCountry:string;
  standings: StandingsObj[];

  constructor(private httpServices:HttpServices,
              private router: Router,
              private route: ActivatedRoute,
              private stateService:StateService){
    this.standings = [];
    this.selectedCountry = "Enagland";
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const countryName:string|null = params.get('country');
      if(countryName)
      {
          this.getSelectedCountryData(countryName);
      }
    });

   
  }

  getSelectedCountryData(country:string){

    this.selectedCountry = country;
    const leagueId:number|undefined = this.stateService.getLeagueId(this.selectedCountry);

    if(leagueId)
    {
      const chachedData:string|null = localStorage.getItem("cachedLeagueData" + leagueId);
      if(chachedData)
      {
        const data: StandingType = JSON.parse(chachedData);
        this.standings = data.response[0].league.standings[0];
      }else {
        this.httpServices.getStandingsOfTopLeague(leagueId).subscribe(
          {
            next: (data: StandingType) => {
              if(data != undefined && data.response != undefined && data.response.length != 0)
              {
                this.standings = data.response[0].league.standings[0];
                localStorage.setItem("cachedLeagueData" + leagueId, JSON.stringify(data));
              }
            },
            error: (err:HttpErrorResponse) => {
              console.log(err);
            }
          }
        )
      }
    }
  }


  redirectToResultScreen(teamId:number) {
    this.router.navigate(['soccer',this.selectedCountry,teamId]);
  }


}
