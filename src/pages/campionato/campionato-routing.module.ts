import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampionatoPage } from './campionato.page';

const routes: Routes = [
  {
    path: '',
    component: CampionatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampionatoPageRoutingModule {}
