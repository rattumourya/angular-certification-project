export interface LeagueDetails  {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  }
  
export  interface StandingsObj  {
    rank: number;
    team: {
      id: number;
      name: string;
      logo: string;
    };
    points: number;
    goalsDiff: number;
    group: string;
    form: string;
    status: string;
    description: string;
    all: LeagueDetails;
    home: LeagueDetails;
    away: LeagueDetails;
    update: string;
  }
  
export interface StandingsResponse {
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
      standings: StandingsObj[][];
    };
  }
  
  export interface StandingType {
    get: string;
    parameters: {
      league: string;
      season: string;
    };
    errors: []; // You might want to define a specific type for errors
    results: number;
    paging: {
      current: number;
      total: number;
    };
    response: StandingsResponse[];
  }
  