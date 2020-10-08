import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Post} from '../../interfaces/post';
import * as _ from 'lodash';
import {NavController} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {AlertService} from '../../services/alert/alert.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.page.html',
    styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
    public item: Post;
    public posts: Array<Post>;
    public featured: Array<Post>;

    public slideOpts = {
        initialSlide: 0,
        speed: 400
    };

    constructor(private route: ActivatedRoute, private router: Router, private navCtrl: NavController,
                public socialSharing: SocialSharing, public alertService: AlertService) {
        this.route.queryParams.subscribe((params) => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.item = this.router.getCurrentNavigation().extras.state.data;
                this.posts = this.router.getCurrentNavigation().extras.state.posts;
                this.featured = this.featuredPosts(this.item, this.posts);
            }
        });
    }

    ngOnInit() {
    }

    featuredPosts(item, posts): Array<Post> {
        let array = [];
        console.log(this.posts);
        array = _.filter(this.posts, o => o.categories[0] === item.categories[0]);
        console.log(array);
        _.remove(array, o => o.id === item.id);
        console.log(array);
        array = array.slice(0, 5);
        console.log(array);
        return array;
    }

    backToHome() {
        this.navCtrl.navigateRoot('/tabs/tab3', {animationDirection: 'back'});

    }

    clickCategory(category) {


        console.log(category);

        const navigationExtras: NavigationExtras = {
            state: {
                data: category,
            }
        };

        this.navCtrl.navigateRoot('/tabs/tab2', {animationDirection: 'back', state: {data: category}});
    }

    shareFB() {
        this.socialSharing
            .shareViaFacebook(this.item?.content.rendered, this.item._embedded['wp:featuredmedia'][0].source_url)
            .then(() => {
                // Success!
            })
            .catch((error) => {
                this.alertService.presentAlert(
                    'Applicazione Non Installata',
                    '',
                    'Non è stato possibile condividere il post',
                    [
                        {
                            text: 'OK',
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            },
                        },
                    ]
                );
            });
    }

    shareIN() {
        this.socialSharing
            .shareViaInstagram(this.item?.content.rendered, this.item._embedded['wp:featuredmedia'][0].source_url)
            .then(() => {
                // Success!
            })
            .catch((error) => {
                this.alertService.presentAlert(
                    'Applicazione Non Installata',
                    '',
                    'Non è stato possibile condividere il post',
                    [
                        {
                            text: 'OK',
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            },
                        },
                    ]
                );
            });
    }

    shareWA() {
        this.socialSharing
            .shareViaWhatsApp(this.item?.content.rendered, this.item._embedded['wp:featuredmedia'][0].source_url)
            .then(() => {
                // Success!
            })
            .catch((error) => {
                this.alertService.presentAlert(
                    'Applicazione Non Installata',
                    '',
                    'Non è stato possibile condividere il post',
                    [
                        {
                            text: 'OK',
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            },
                        },
                    ]
                );
            });
    }

    shareTW() {
        this.socialSharing
            .shareViaTwitter(this.item?.content.rendered, this.item._embedded['wp:featuredmedia'][0].source_url)
            .then(() => {
                // Success!
            })
            .catch((error) => {
                this.alertService.presentAlert(
                    'Applicazione Non Installata',
                    '',
                    'Non è stato possibile condividere il post',
                    [
                        {
                            text: 'OK',
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            },
                        },
                    ]
                );
            });
    }

}
