import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
// import {FormControl,Validators} from "@angular/forms";
import { DAYS } from '../../models/constantes';
import { User } from 'src/app/models/user.model';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user:User;
  public today:string;
  public groups: Group[];
  public day: any;
  public days_week:any[];

  constructor(private router:Router, private userService:UserService, private groupService:GroupService) {
  }
  

  ngOnInit() {
    this.user = this.userService.getStorageUser();
    this.getDateAndGroups();
  }

  findParams(list,value){
    return list.find(element=>element.day_week==value);
  }

  getDateAndGroups(){
    this.today = this.getDayOfWeek(new Date().getDay());
    console.log(this.today);
    let teacher_send = this.user._id;
    let day_send = this.today;
    //llAMAR EL SERVICIO OBTENER 
    if(this.user.role.level == 2){
      console.log('Docente');
      let data = {teacher: teacher_send, days_week: this.today};
      console.log(data);
      this.groupService.teacherGroupsDay(data).subscribe(res=>{
        console.log(res);
        console.log(this.today);
        this.groups = res.body.body.group;
        
        for (let index = 0; index < this.groups.length; index++) {
          const element = this.groups[index];
          this.days_week = this.findParams(element.days_week,this.today);
        }
      });
      
    }else if(this.user.role.level == 3){
      console.log('Estudiante');
      let data = {student: teacher_send, days_week: day_send};
      this.groupService.studentGroupsDay(data).subscribe(res=>{
        console.log(res);
        this.groups = res.body.body.group;
      });
    }

  }

  getDayOfWeek(num){
    return DAYS[num-1];
  }

  getLogin(){
    this.router.navigate(['/login']);
  }
  getRegister(){
    this.router.navigate(['/register']);
  }

  presence(_id){
    if(this.user.role.level == 3){
      this.router.navigate(['../presence-student',_id]);
    }else{
      this.router.navigate(['../presence-add',_id]);
    }
  }

}
