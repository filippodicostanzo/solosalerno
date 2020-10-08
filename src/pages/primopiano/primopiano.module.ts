import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PrimopianoPageRoutingModule} from './primopiano-routing.module';

import {PrimopianoPage} from './primopiano.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PrimopianoPageRoutingModule,
        SharedModule
    ],
    declarations: [PrimopianoPage]
})
export class PrimopianoPageModule {
}
