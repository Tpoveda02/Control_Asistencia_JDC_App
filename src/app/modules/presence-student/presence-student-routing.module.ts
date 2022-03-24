import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresenceStudentPage } from './presence-student.page';

const routes: Routes = [
  {
    path: '',
    component: PresenceStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresenceStudentPageRoutingModule {}
