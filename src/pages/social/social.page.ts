import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import {InstagramService} from 'src/services/instagram/instagram.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {

  constructor(
      public platform: Platform,
      public getinstagramService: InstagramService,
      public inAppBrowser: InAppBrowser,
  ) {
  }

  public feed: any;


  ngOnInit() {
    this.platform.ready().then(() => {
      this.getinstagramService
          .getData('mediasbyaccount', '41010826949', 20)
          .then((data) => {
            this.feed = data;
            console.log(this.feed);
          });
    });
  }

  openLink(item) {
    const options = 'location=no';
    const browser = this.inAppBrowser.create(item, '_blank', options);
  }

}
