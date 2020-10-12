import {Component, OnInit} from '@angular/core';
import {SquadService} from '../../services/squad/squad.service';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-team',
    templateUrl: './team.page.html',
    styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

    data: any;
    squad = {
        goalkeepers: [],
        defenders: [],
        midfielders: [],
        attackers: []
    }

    constructor(private platform: Platform, public getSquadService: SquadService) {
    }

    ngOnInit() {

        this.platform.ready().then(() => {
            this.getSquadService.getData()
                .then((data) => {
                    this.data = data;
                    console.log(this.data);
                    this.createSquad();
                });
        });

    }

    createSquad()
    {

        const a = this.data.playersnumber.api.players;
        const b = this.data.playerscomplete.api.players;

        console.log(a);
        console.log(b);


        for (let i = 0, len = a.length; i < len; i++) {
            for (let j = 0, len2 = b.length; j < len2; j++) {
                if (b[j].player.includes(a[i].lastname) || a[i].player_name === b[j].player) {
                    a[i].number = b[j].number;

                    if (a[i].position === 'Goalkeeper') {
                        this.squad.goalkeepers.push(a[i]);
                    } else if (a[i].position === 'Defender') {
                        this.squad.defenders.push(a[i]);
                    } else if (a[i].position === 'Midfielder') {
                        this.squad.midfielders.push(a[i]);
                    } else {
                        this.squad.attackers.push(a[i]);
                    }

                }
            }
        }
        console.log(this.squad);
    }

}
