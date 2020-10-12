export interface Player {
    number: string;
    player: string;
}

export interface Api {
    results: number;
    coachs: string[];
    players: Player[];
}

export interface Squad {
    api: Api;
}
