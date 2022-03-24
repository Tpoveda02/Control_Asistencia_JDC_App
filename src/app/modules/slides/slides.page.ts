import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlidesPage implements OnInit {


  public show: boolean;

  constructor(
    private navController: NavController) {
    this.show = false;
  }

  ngOnInit() {
    let l = localStorage.getItem('first-time-app');
    if (l == null || l !=null) {
      this.show = true;
    } else {
      this.show = false;
      this.goToHome();
    }
  }

  goToHome() {
    localStorage.setItem('first-time-app', 'true');
    this.navController.navigateRoot('register');
  }
  goToLogin() {
    localStorage.setItem('first-time-app', 'true');
    this.navController.navigateRoot('login');
  }
}