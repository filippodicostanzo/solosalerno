import {Injectable} from '@angular/core';
import {LoadingService} from '../loading/loading.service';
import {AlertService} from '../alert/alert.service';
import axios from 'axios';
import {Players} from '../../interfaces/player';
import {Squad} from '../../interfaces/squad';


@Injectable({
    providedIn: 'root'
})
export class SquadService {

    state: {
        playerscomplete: Array<Players>,
        playersnumber: Array<Squad>,
    };

    constructor(private loadingService: LoadingService, private alertService: AlertService) {
        this.state = {
            playerscomplete: [],
            playersnumber: []
        };
    }

    async getData() {

        const urlSquad = 'https://php.localidautore.it/soccer/index.php?option=squad';
        const urlPlayers = 'https://php.localidautore.it/soccer/index.php?option=players';


        if (this.state.playerscomplete.length !== 0) {
            return Promise.resolve(this.state);
        } else {
            return new Promise((resolve) => {

                this.loadingService.presentLoading('loadSquad').then(() => {

                    const requestOne = axios.get(urlSquad);
                    const requestTwo = axios.get(urlPlayers);

                    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
                        this.loadingService.dismissLoading('loadSquad');
                        const responseOne = responses[0];
                        const responseTwo = responses[1];

                        console.log(responseOne.data);

                        this.state.playerscomplete = responseOne.data;
                        this.state.playersnumber = responseTwo.data;

                        resolve(this.state);

                    })).catch((error) => {
                            this.loadingService.dismissLoading('loadSquad');
                            this.alertService.presentAlert(
                                'Errore',
                                '',
                                'Si è verificato un errore durante il recupero dei dati',
                                ['OK']
                            );
                            console.log(error);
                        }
                    );
                });
            });

        }
    }
}
