import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Post} from '../../interfaces/post';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input('post') item: Post;
    @Input('posts') posts: Array<Post>
    @Input('excerpt') excerpt: boolean

    constructor(public navCtrl: NavController) {
    }

    ngOnInit() {
    }

    clickEvent(item, posts) {
        console.log(item);
        const navigationExtras: NavigationExtras = {
            state: {
                data: item,
                posts
            },
        };

        this.navCtrl.navigateForward('/post/' + item.id, navigationExtras);
    }
}
