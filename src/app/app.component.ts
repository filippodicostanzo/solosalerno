import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private oneSignal: OneSignal
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#5b1419');
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            this.oneSignalOldSDK();
        });
    }


    oneSignalOldSDK() {
        this.oneSignal.startInit(
            '9701567b-b444-4b46-9be1-352a26fe8440',
            '1022698472550'
        );

        this.oneSignal.inFocusDisplaying(
            this.oneSignal.OSInFocusDisplayOption.InAppAlert
        );

        this.oneSignal.handleNotificationReceived().subscribe(() => {
            // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
            // do something when a notification is opened
            console.log('Notify');
        });

        this.oneSignal.endInit();
    }

}
