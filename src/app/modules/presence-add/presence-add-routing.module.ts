import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {  PresenceAddPage } from './presence-add.page';

const routes: Routes = [
  {
    path: '',
    component: PresenceAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresenceAddPageRoutingModule {}