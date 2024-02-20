import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { StandingLeaguesComponent } from './components/standing-leagues/standing-leagues.component';

const routes: Routes = [
  { path: '', redirectTo: 'soccer/England', pathMatch: 'full' },
  {path:'soccer/:country',component:StandingLeaguesComponent},
  {path:'soccer/:country/:teamId',component:GameResultsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
