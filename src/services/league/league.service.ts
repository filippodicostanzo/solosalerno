import {Injectable} from '@angular/core';
import {LoadingService} from '../loading/loading.service';
import {AlertService} from '../alert/alert.service';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class LeagueService {

    state = {
        calendar: [],
        leaguetable: [],
        match: []
    };


    constructor(private loadingService: LoadingService, private alertService: AlertService) {

    }

    async getData() {

        const urlCalendar = 'https://php.localidautore.it/soccer/index.php?option=calendar';
        const urlLeagueTable = 'https://php.localidautore.it/soccer/index.php?option=leaguetable';
        const urlMatch = 'https://php.localidautore.it/soccer/index.php?option=match';


        if (this.state.calendar.length !== 0) {
            return Promise.resolve(this.state);
        } else {
            return new Promise((resolve) => {

                this.loadingService.presentLoading('loadLeague').then(() => {

                    const requestOne = axios.get(urlCalendar);
                    const requestTwo = axios.get(urlLeagueTable);
                    const requestThree = axios.get(urlMatch);

                    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
                        this.loadingService.dismissLoading('loadLeague');
                        const responseOne = responses[0];
                        const responseTwo = responses[1];
                        const responseThree = responses[2];

                        console.log(responseOne.data);

                        this.state.calendar = responseOne.data;
                        this.state.leaguetable = responseTwo.data;
                        this.state.match = responseThree.data;

                        resolve(this.state);

                        console.log(responseTwo.data);
                        console.log(responseThree.data);
                    })).catch((error) => {
                            this.loadingService.dismissLoading('loadLeague');
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
