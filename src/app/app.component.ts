import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {EventsService} from '../services/events/events.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    @ViewChild("app", {static: false}) testdiv: ElementRef;
    dyanmicBackground: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private oneSignal: OneSignal,
        public eventsService: EventsService,
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

            setTimeout(()=> {this.dyanmicBackground = 'primary';},3000)


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
            // this.platform.resume.subscribe((result) => {
            // this.eventsService.publish('refresh-data');
            // });

            this.eventsService.publish('refresh-data');

        });


        this.oneSignal.endInit();
    }

}
