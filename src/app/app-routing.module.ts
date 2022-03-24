import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './modules/home/home.module';
import { RegisterPageModule } from './modules/register/register.module';
import { TokenPageModule } from './modules/token/token.module';
import { GroupPageModule } from './modules/group/group.module';
import { SlidesPageModule } from './modules/slides/slides.module';
import { LoginPageModule } from './modules/login/login.module';
import { GroupAddPageModule } from './modules/group-add/group-add.module';
import { PresencePageModule } from './modules/presence/presence.module';
import { ServiceAccountService } from './services/service-account/service-account.service';
import { GroupDetailPageModule } from './modules/group-detail/group-detail.module';
import { PresenceAddPageModule } from './modules/presence-add/presence-add.module';
import { PresenceStudentPageModule } from './modules/presence-student/presence-student.module';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'slides',loadChildren: () => SlidesPageModule, canActivate: [ServiceAccountService]},
  {path: 'login', loadChildren: () =>  LoginPageModule},
  {path: 'token', loadChildren: () =>  TokenPageModule},
  {path: 'register', loadChildren: () =>  RegisterPageModule},
  {path: 'home', loadChildren: () =>  HomePageModule},
  {path: 'group', children: 
    [{path: "", loadChildren: () =>  GroupPageModule},
    {path: 'group-add/:_id', loadChildren: ()=>GroupAddPageModule},
    {path: 'group-detail/:_id',loadChildren: () => GroupDetailPageModule}]},
  {path: 'presence', loadChildren: () => PresencePageModule},
  {path: 'presence-add/:_id',loadChildren: () => PresenceAddPageModule},
  {path: 'presence-student',loadChildren: () => PresenceStudentPageModule}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
