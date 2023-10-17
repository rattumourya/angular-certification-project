import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServices } from '../../services/http.service';
import { fixtureObj, fixureType } from '../../interfaces/fixtures.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit{

  selectedCountry:string | null;
  fixureArr:fixtureObj[];
  constructor( private router: Router,
               private route: ActivatedRoute,
               private httpServices:HttpServices
               )
               {
        this.selectedCountry = "England";
        this.fixureArr = [];
    };

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.selectedCountry = params.get('country');
      const teamId:string|null = params.get('teamId');
      if(teamId)
      {
        this.getFootballResultHandler(+teamId);
      }
     
    });
  }
  
  backHandler(){
    if(this.selectedCountry)
    {
      this.router.navigate(['soccer',this.selectedCountry]);
    }
  }

  getFootballResultHandler(teamId:number) {

    const resultCount:number = 10;
    const chachedData:string|null = localStorage.getItem("cachedFixtureData"+teamId);
    
    if(chachedData)
    {
      const data: fixureType = JSON.parse(chachedData);
      if(data != null && data.response != null)
      {
        this.fixureArr = data.response;
        localStorage.setItem("cachedFixtureData"+teamId, JSON.stringify(data));
        console.log("chachedData",data);
      }

    }else {

      this.httpServices.getGameResults(teamId,resultCount).subscribe(
        {
          next: (data: fixureType) => {
            
            if(data != null && data.response != null)
            {
              this.fixureArr = data.response;
              localStorage.setItem("cachedFixtureData"+teamId, JSON.stringify(data));
              console.log("SreviceData",data);
              this.fixureArr[0].goals.home
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
