import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupAddPageModule } from '../group-add/group-add.module';

import { GroupPage } from './group.page';

const routes: Routes = [
  {
    path: '',
    component: GroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupPageRoutingModule {}
