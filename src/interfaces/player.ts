export interface Player {
    player_id: number;
    player_name: string;
    firstname: string;
    lastname: string;
    number?: any;
    position: string;
    age: number;
    birth_date: string;
    birth_place: string;
    birth_country: string;
    nationality: string;
    height: string;
    weight: string;
}

export interface Api {
    results: number;
    players: Player[];
}

export interface Players {
    api: Api;
}
