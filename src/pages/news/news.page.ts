import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, Platform} from '@ionic/angular';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Category} from '../../interfaces/category';
import {DataService} from '../../services/data/data.service';
import {Data} from '../../interfaces/data';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
    @ViewChild(IonContent) private content: IonContent;

    data: Data = {
        baseUrl: '',
        catUrl: '',
        categories: [],
        embed: '',
        perPage: '',
        wpFetchHeaders: {headers: {'Access-Control-Allow-Origin': '', 'Access-Control-Expose-Headers': ''}},
        posts: []
    };
    items: any[] = [];
    categories: [Category];
    active = 0;
    currentPosts = [];

    private subscription: Subscription;

    constructor(public platform: Platform, private route: ActivatedRoute, private router: Router, public getData: DataService) {
    }

    ngOnInit() {

/*
        this.platform.ready().then(() => {
            this.getData.getData( true).then((data) => {
                // @ts-ignore
                this.data = data;
                this.active = this.data.categories[0].id;
                console.log(this.active);
                this.getInitPost(this.active);
            });


        });
*/
    }

    ionViewWillEnter() {
        this.getData.getData(true).then((data) => {
            console.log(data);
            // @ts-ignore
            this.data = data;
            this.active = this.data.categories[0].id;
            console.log(this.data);
            console.log(this.active);
            this.getInitPost(this.active);
        });
    }

    getInitPost(id) {
        this.data.posts.map((item) => {
            // tslint:disable-next-line:radix
            const catid = id;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < item.categories.length; i++) {
                if (catid === item.categories[i]) {
                    this.currentPosts.push(item);
                }
            }

        });
    }

    segmentChanged(id) {

        this.currentPosts = [];

        this.data.posts.map((item) => {
            // tslint:disable-next-line:radix
            const catid = parseInt(id.detail.value);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < item.categories.length; i++) {
                if (catid === item.categories[i]) {
                    this.currentPosts.push(item);
                }
            }

        });

        //console.log(this.currentPosts);

    }

}
