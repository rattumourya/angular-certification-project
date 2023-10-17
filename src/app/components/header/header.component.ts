import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  leagueCountries:{countryName:string,
    leagueName:string,
    leagueId:number}[];
    
    @Input() selectedCountry:string;

    constructor(private stateService: StateService,
                private router:Router) {
      this.leagueCountries = [];
      this.selectedCountry = "England";
    }

    ngOnInit() {
      this.leagueCountries = this.stateService.getLeagueCountries();
    }


    selectedCountryFn(countryName:string) {
      this.selectedCountry = countryName;
      this.router.navigate(['soccer',this.selectedCountry]);
    }
}
