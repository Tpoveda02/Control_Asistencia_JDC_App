import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group/group.service';
import { CourseService } from 'src/app/services/course/course.service'; 
import { Group } from 'src/app/models/group.model';
import { Course } from 'src/app/models/course.model';
import { Presence } from 'src/app/models/presence.model';
import { PrimeNGConfig, SelectItemGroup } from "primeng/api";
import { NavController, ToastController } from '@ionic/angular';
import { PresenceService } from 'src/app/services/presence/presence.service';
@Component({
  selector: 'app-presence',
  templateUrl: './presence.page.html',
  styleUrls: ['./presence.page.scss'],
})
export class PresencePage implements OnInit {

  groupDialog: boolean;

  groups: Group[];

  courses: Course[];
  selectedCourses: any[];
  presences: Presence[];
  group: Group;

  selectedGroups: Group[];

  submitted: boolean;
  displayedColumns: string[];
  datasourse;

  constructor(public groupService: GroupService,  public presenceService: PresenceService,private courseService: CourseService,
       private primengConfig: PrimeNGConfig, private navCotroller:NavController,public toastController: ToastController) { }
    ngOnInit() {
      this.groupService.getGroups().subscribe(data => {
        this.groups=data.body.body.group;
      });
      this.primengConfig.ripple = true;
      this.courseService.getCourses().subscribe(data => {
          console.log(data);
          
      });
      this.primengConfig.ripple = true;
  }
  getPresences(){
    let data;
    this.presenceService.byData(data).subscribe(res => {
        console.log(res);
        this.presences = res.body.body.presence;
        this.presentToastOk(res.body.msj);
      },err => {
        this.presentToastError(err.error.body.msj);
      });

      for (let index = 0; index < this.presences.length; index++) {
          if(this.find(index)){
              this.displayedColumns[index] =  this.presences[index].date_class.toString();
          }
      }
  }
  find(index){
    for (let i = 0; i < this.displayedColumns.length; i++) {
      if(this.displayedColumns[index] == this.displayedColumns[i]){
          return false;
      }
    }
    return true;
  }

  openNew(data) {
      this.submitted = false;
      this.groupDialog = true;
      this.groupService.getGroup(data).subscribe(data=>{
        this.group = data.body.body.group;
      });

  }

  hideDialog() {
      this.groupDialog = false;
      this.submitted = false;
  }
  report(){
    this.navCotroller.navigateRoot('presence');
  }

  async presentToastError(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }
  async presentToastOk(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }
  async presentToastWarning(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      color: 'warning'
    });
    toast.present();
  }

}
