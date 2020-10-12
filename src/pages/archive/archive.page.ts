import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data/data.service';
import {format} from 'date-fns';
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-archive',
    templateUrl: './archive.page.html',
    styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {

    type: string;
    item: any;
    data: any;
    title: string;
    currentPosts = [];

    constructor(private route: ActivatedRoute, private router: Router, private navCtrl: NavController, private getData: DataService) {
        this.route.queryParams.subscribe((params) => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.type = this.router.getCurrentNavigation().extras.state.type;
                this.item = this.router.getCurrentNavigation().extras.state.item;
                console.log(this.type);
                console.log(this.item);
                this.getPosts(this.type, this.item);
            }
        });

    }

    ngOnInit() {
    }

    backToHome() {
        this.navCtrl.navigateRoot('/tabs/tab3', {animationDirection: 'back'});

    }

    getPosts(type, item) {
        this.getData.getData(true).then((data) => {
            // @ts-ignore
            this.data = data;

            console.log(this.data);

            if (type === 'category') {
                this.currentPosts = [];

                this.data.posts.map((post) => {
                    // tslint:disable-next-line:radix
                    const catid = item;
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < post.categories.length; i++) {
                        if (catid === post.categories[i]) {
                            post._embedded['wp:term'][0].map((category) => {
                                if (category.id === catid) {
                                    this.title = category.name;
                                }
                            });
                            this.currentPosts.push(post);
                        }
                    }

                });


            }

            if (type === 'date') {
                this.currentPosts = [];
                this.data.posts.map((post) => {
                    if (format(new Date(post.date), 'dd/MM/yyyy') === format(new Date(item), 'dd/MM/yyyy')) {
                        this.currentPosts.push(post);
                    }
                });
                this.title = format(new Date(item), 'dd/MM/yyyy');
            }


            if (type === 'author') {
                this.currentPosts = [];
                console.log(item);
                this.data.posts.map((post) => {
                    if (post.author === item) {
                        this.currentPosts.push(post);
                    }
                });
                this.title = this.currentPosts[0]._embedded['author'][0].name;
            }

        });
    }

}
