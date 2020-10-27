import {Component, NgZone, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Post} from '../../interfaces/post';
import {DataService} from '../../services/data/data.service';
import {EventsService} from '../../services/events/events.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-primopiano',
    templateUrl: './primopiano.page.html',
    styleUrls: ['./primopiano.page.scss'],
})
export class PrimopianoPage implements OnInit {

    posts: Array<Post>;
    allposts: Array<Post>;
    subscription: Subscription;

    constructor(public platform: Platform, public getDataService: DataService, private eventsService: EventsService, private zone: NgZone) {
    }

    ngOnInit() {
        this.platform.ready().then(() => {
            this.getDataService.getHighlites().then((data) => {
                // @ts-ignore
                this.posts = data.highlites.slice(0, 20);
            });

            this.getDataService.getData(false).then((data) => {
                // @ts-ignore
                this.allposts = data.posts;
            });
        });
    }

    doRefresh(event) {


        this.getDataService.getHighlitesForce().then((data) => {
            this.posts = [];
            // @ts-ignore
            this.posts = data.highlites.slice(0, 20);
            event.target.complete();
        });

        this.getDataService.getDataForce().then((data) => {
            // @ts-ignore
            this.allposts = data.posts;
        });


    }


    ionViewDidEnter() {

        setTimeout(() => {

            const subscription = this.eventsService.subscribe('refresh-data', (item) => {
                console.log('LOOOOOADING EVENT');
                console.log('Listen Event');
                this.zone.run(() => {
                    this.getDataService.getHighlitesForce().then((data) => {
                        this.posts = [];
                        // @ts-ignore
                        this.posts = data.highlites.slice(0, 20);
                    });

                    this.getDataService.getDataForce().then((data) => {
                        // @ts-ignore
                        this.allposts = data.posts;
                    });
                });

                //subscription.unsubscribe();

            });
        }, 1000);

    }

    ionViewWillLeave() {
        console.log('uscito');
        this.eventsService.destroy('refresh-data');
    }

}




