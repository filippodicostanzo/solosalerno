export interface LeagueTable {
    api?: Api;
}

interface Api {
    results: number;
    standings: Standing[][];
}

interface Standing {
    rank: string;
    team_id: string;
    teamName: string;
    matchsPlayed: string;
    win: string;
    draw: string;
    lose: string;
    goalsFor: string;
    goalsAgainst: string;
    goalsDiff: string;
    points: string;
    group: string;
    lastUpdate: string;
}
