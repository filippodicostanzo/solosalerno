import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {LeagueService} from '../../services/league/league.service';
import {format, isAfter} from 'date-fns';
import * as _ from 'lodash';
import {LeagueTable} from '../../interfaces/leaguetable';
import {Fixture, Match} from '../../interfaces/match';


@Component({
    selector: 'app-campionato',
    templateUrl: './campionato.page.html',
    styleUrls: ['./campionato.page.scss'],
})
export class CampionatoPage implements OnInit {

    active = 0;
    leaguetable: LeagueTable = {};
    nexttable: Array<Fixture>;
    previoustable: Array<Fixture>;
    image = 'https://php.localidautore.it/soccer/images/emblems/';
    state: {
        match?: Match,
        calendar?: any,
        leaguetable?: LeagueTable
    };
    previous: any;
    next: any;

    constructor(public platform: Platform, public getLeagueService: LeagueService) {
    }

    ngOnInit() {

        this.platform.ready().then(() => {
            this.getLeagueService.getData().then((data) => {

                this.state = data;

                const objectArray = Object.entries(this.state.calendar);

                // @ts-ignore
                objectArray.forEach(([key, value]) => {
                    // @ts-ignore
                    if (isAfter(new Date(), new Date(value))) {
                        this.previous = parseFloat(key) + 1;
                    }
                });

                console.log(this.previous);
                this.next = this.previous + 1;

                console.log(objectArray[this.previous]);

                console.log(this.state.match);
                console.log(this.state.calendar);

                const index = _.findIndex(this.state.match.api.fixtures, {round: 'Regular Season - ' + this.next});

                this.nexttable = _.slice(this.state.match.api.fixtures, index, index + 10);
                this.previoustable = _.slice(this.state.match.api.fixtures, index - 10, index);

                this.leaguetable = data;
                console.log(this.leaguetable);

            });
        });
    }


    segmentChanged(id) {
        console.log(id);
        this.active = id.detail.value;
    }

}
