import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Post} from '../../interfaces/post';
import {DataService} from '../../services/data/data.service';

@Component({
    selector: 'app-primopiano',
    templateUrl: './primopiano.page.html',
    styleUrls: ['./primopiano.page.scss'],
})
export class PrimopianoPage implements OnInit {

    posts: Array<Post>;
    allposts: Array<Post>;

    constructor(public platform: Platform, public getDataService: DataService) {
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

}



