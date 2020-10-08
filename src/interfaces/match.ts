export interface Match {
    api?: Api;
}

interface Api {
    results: number;
    fixtures: Fixture[];
}

export interface Fixture {
    fixture_id: number;
    league_id: number;
    league: League;
    event_date: string;
    event_timestamp: number;
    firstHalfStart: number;
    secondHalfStart: number;
    round: string;
    status: string;
    statusShort: string;
    elapsed: number;
    venue: string;
    referee: string;
    homeTeam: HomeTeam;
    awayTeam: HomeTeam;
    goalsHomeTeam: number;
    goalsAwayTeam: number;
    score: Score;
}

interface Score {
    halftime: string;
    fulltime: string;
    extratime?: any;
    penalty?: any;
}

interface HomeTeam {
    team_id: number;
    team_name: string;
    logo: string;
}

interface League {
    name: string;
    country: string;
    logo: string;
    flag: string;
}
