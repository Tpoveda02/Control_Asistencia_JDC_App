import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { NavController } from '@ionic/angular';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServiceAccountService implements CanActivate{

  constructor(private http:HttpClient, private authService:AuthService, private navCotroller:NavController) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.getStorageToken()) {
        console.log('No estás logueado');
        this.navCotroller.navigateRoot(['/login']);
        return false;
    }
    return true;
}
}
