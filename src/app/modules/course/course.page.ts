import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  course = []
  alertCtrl: any;
  constructor(private courseService:CourseService, private router: Router) { }

  disabled: boolean = false;
  ngOnInit() {
  }
  ionViewWillEnter(){
    // this.course = this.courseService.getAll();
  }

  deleteCourse(id: HTMLInputElement, event:CustomEvent){
    this.disabled = true;
    this.courseService.delete(id.value);
  }

  async alertDeleteCourse (){
   const alerElement = await this.alertCtrl.create({
      header:'Seguro que quiere eleminar eso?',
      message: 'Ten cuidado',
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancelar'
      },
      {
        text: 'Borrar',
        handle: () => {
          // this.courseService.deleteCourse(this.course.name);
          this.router.navigate(['/course'])
        }
      }
    ]
    });
  await alerElement.present();
    }
}
