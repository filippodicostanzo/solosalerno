import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimopianoPage } from './primopiano.page';

const routes: Routes = [
  {
    path: '',
    component: PrimopianoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimopianoPageRoutingModule {}
