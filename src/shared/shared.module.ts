import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {CardComponent} from '../components/card/card.component';
import {InstagramComponent} from '../components/instagram/instagram.component';
import {InstagramdatePipe} from '../pipes/instagramdate/instagramdate.pipe';
import {MatchdatePipe} from '../pipes/matchdate/matchdate.pipe';
import {TruncateModule} from '@yellowspot/ng-truncate';

import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

@NgModule({
    declarations: [InstagramdatePipe, MatchdatePipe, CardComponent, InstagramComponent],
    imports: [
        CommonModule,
        RouterModule,
        IonicModule,
        FontAwesomeModule,
        TruncateModule,
    ],
    exports: [
        FontAwesomeModule,
        TruncateModule,
        InstagramdatePipe,
        MatchdatePipe,
        CardComponent,
        InstagramComponent,
    ],
})
export class SharedModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab, far);
    }
}
