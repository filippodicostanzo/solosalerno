import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Post} from '../../interfaces/post';
import {DataService} from '../../services/data/data.service';
import {EventsService} from '../../services/events/events.service';

@Component({
    selector: 'app-primopiano',
    templateUrl: './primopiano.page.html',
    styleUrls: ['./primopiano.page.scss'],
})
export class PrimopianoPage implements OnInit {

    posts: Array<Post>;
    allposts: Array<Post>;

    constructor(public platform: Platform, public getDataService: DataService, private eventsService: EventsService) {
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
            // @ts-ignore
            this.posts = data.highlites.slice(0, 20);
            event.target.complete();
        });

        this.getDataService.getDataForce().then((data) => {
            // @ts-ignore
            this.allposts = data.posts;
        });


    }


    ionViewWillEnter() {
        const subscription = this.eventsService.subscribe('refresh-data', () => {
            console.log('Listen Event');
            this.getDataService.getHighlitesForce().then((data) => {
                // @ts-ignore
                this.posts = data.highlites.slice(0, 20);
            });

            this.getDataService.getDataForce().then((data) => {
                // @ts-ignore
                this.allposts = data.posts;
            });

            this.eventsService.destroy('refresh-data');
        });
    }

}




