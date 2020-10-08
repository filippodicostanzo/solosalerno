import {Component, Input, OnInit} from '@angular/core';
import {Instagram} from '../../interfaces/instagram';

import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-instagram',
    templateUrl: './instagram.component.html',
    styleUrls: ['./instagram.component.scss'],
})
export class InstagramComponent implements OnInit {

    @Input('instagram') item: Instagram;

    constructor(public inAppBrowser: InAppBrowser) {
    }

    ngOnInit() {
    }

    clickEvent(item) {
        const options = 'location=no';
        const browser = this.inAppBrowser.create(item, '_blank', options);
    }

}
