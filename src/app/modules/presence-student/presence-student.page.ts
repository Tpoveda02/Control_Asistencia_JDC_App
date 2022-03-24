import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ToastController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { PrimeNGConfig } from "primeng/api";
import { ConfirmationService } from 'primeng/api';

import { DAYS } from '../../models/constantes';
import { UserService } from 'src/app/services/user/user.service';
import { GroupService } from 'src/app/services/group/group.service';
import { PresenceService } from 'src/app/services/presence/presence.service';
import { Plugins } from '@capacitor/core';
const {Geolocation} = Plugins;
import { Days_week } from '../../models/days_week.model';

// logitud, latitud 
@Component({
  selector: 'app-presence-student',
  templateUrl: './presence-student.page.html',
  styleUrls: ['./presence-student.page.scss'],
})
export class PresenceStudentPage implements OnInit {

// Varible con la info usuario
public user: User;
// Variable para el grupo
public group: Group;
// Variable para cargar
public loading: boolean;
// Variable para el idGrupo
public id_Group: string;
// Variable dia actual
public today:string;
// Variable dia grupo
public day:Days_week;
// Variable estado asistencia
public status:string;
// Varibale nombre boton
public register:string;


  constructor(
    public toastController: ToastController, private userService:UserService,public groupService: GroupService, private presenceService: PresenceService,  
    public navCotroller: NavController, private activatedRoute: ActivatedRoute,private primengConfig: PrimeNGConfig,
    public plt: Platform, public geolocation:Geolocation, public confirmationService:ConfirmationService,
  ) {
    this.loading = false;
    
  }
  ngOnInit() {
    this.user = this.userService.getStorageUser();
     this.activatedRoute.paramMap.subscribe(idGroup => {
     this.id_Group = idGroup.get('_id');
     this.getGroup();
   });
   

  }
  /**
   * Método para obtener el grupo
   */
   getGroup() {
     this.loading = true;
     this.groupService.getGroup(this.id_Group).subscribe(data=>{
       this.group = data.body.body.group;
       this.today = this.getDayOfWeek(new Date().getDay());
       for (let index = 0; index < this.group.days_week.length; index++) {
        if(data.body.body.group.days_week[index].day_week == this.today){
          this.day = data.body.body.group.days_week[index];
        }
      }
      this.loading = false;
     });
   }


  // Metodo para actualizar la geolocalización
  updLocation(){
    let coords;
    this.geolocation.watchPosition(position => {
      if(position)
        coords = [position.coords.longitude,position.coords.latitude];
    });
  }

  getDayOfWeek(num){
    return DAYS[num-1];
  }
  time(){
    let timeday = new Date();
    let hour = timeday.getHours();
    let minutes = timeday.getMinutes();
    this.register = "Registar asistencia";
    if(hour>=this.day.hour_start.hour && hour<=this.day.hour_finally.hour){
      if(minutes>=this.day.hour_start.hour && minutes<=this.group.delay){
        this.status = 'A';
        return true;
      }else{
        this.register = "Registar asistencia (retardada)";
        this.status = 'R';
        return false;
      }
    }
    return false;
  }

presence(){
  let id_send = this.id_Group;
  let student_send = this.user;
  let status_send = this.status;
  let data = {id:id_send, student:student_send,status:status_send};

  if(this.time()){
    this.presenceService.post(data).subscribe(res => {
      console.log(res);
      // this.presentToastOk(res.body.msj);
    },err => {
      this.presentToastError(err.error.body.msj);
      this.updtCoordinate();
    });
  }
}
updtCoordinate() {
  let data = this.updLocation();
  this.confirmationService.confirm({
      message: '¿Quieres actualizar tus coordinadas?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.userService.coordinate(this.id_Group,data).subscribe(res => {
            console.log(res);
            this.presentToastOk(res.body.msj);
          },err => {
            this.presentToastError(err.error.body.msj);
          });;
      }
  });
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
