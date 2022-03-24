import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ToastController, NavController, Platform, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/models/group.model';
import {Course} from 'src/app/models/course.model';
import { CourseService } from '../../services/course/course.service';
import { PrimeNGConfig } from "primeng/api";
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { DAYS } from '../../models/constantes';
@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.page.html',
  styleUrls: ['./group-add.page.scss'],
})

export class GroupAddPage implements OnInit {

// Variable curso
public selectCourse:string;


// Variable Group
public group:Group;
 /**
   * Campo de ocultar contraseña 
  */
  public hide: boolean;
  /**
  * Campo para activar si existe error en la petición
  */
   public existUser: boolean;
  /**
  * Mensaje de error
  */
  public errorMessage: string;
  /**
  *  Validador del nombre 
  */
  public name: FormControl;


  /**
  *  Validador del codigo
  */
  public code: FormControl;
  /**

  /**
  * Validador del hora de inicio 
  */
   public hour_start: Date;
     /**
  * Validador del hora de inicio 
  */
      public hour_finally: Date;
   /**
   * Validador dias a la semana
  */
  public select_days_week:string[];
 /**
   * Validador dia
  */
public select_day: any; 
  /**
   * Validador estudiantes
  */
  public emails: any[];
  /**
   *  Validador del email
   */
   public email: FormControl;


   /**
   * Emails Enviados
  */
    public sendEmails: any[];
   /**
   * Curso
  */
    public courses: Course[];
    public user:User;

    public id_Group: string;

   /** Focus del teclado*/
   public isKeyboardOpen: boolean;

/** Ventana flotante para agregar un día*/
    public dialogDay: boolean;
/** Mostrar la hora*/
    public times: Date[];

  public loading:boolean;
 
   constructor(
     public toastController: ToastController, private userService:UserService,public groupService: GroupService,  public courseService: CourseService,
     public navCotroller: NavController, private activatedRoute: ActivatedRoute,private primengConfig: PrimeNGConfig,
     public plt: Platform,
   ) {
    this.select_days_week = DAYS;
     this.hide = true;
     this.existUser = true;
     this.name = new FormControl("", [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);
     this.code = new FormControl("", [Validators.required,Validators.minLength(3), Validators.maxLength(8)]);
     this.email = new FormControl("", [Validators.required]);
     this.isKeyboardOpen = false;
     this.loading = false;
     this.dialogDay = false;
     
   }
   ngOnInit() {
    this.primengConfig.ripple = true;
      this.activatedRoute.paramMap.subscribe(idGroup => {
      this.id_Group = idGroup.get('_id');
      this.getGroup();
      this.getCourses();
    });
    
 
   }
   /**
    * Método para guardar el grupo
    */
    getGroup() {
      this.loading = true;
      this.groupService.getGroup(this.id_Group).subscribe(data=>{
        console.log(data);
        this.group = data.body.body.group;
        console.log(this.group);
        this.emails = data.body.body.group.emails;
        this.selectCourse = data.body.body.group.course.name;
      this.loading = false;
      });
    }

    getCourses(){
      this.loading = true;
      this.courseService.getCourses().subscribe(data=>{
        console.log(data);
        this.courses=data.body.body.course;
      });
    }

    addDate(){
      console.log(this.select_days_week);
      let day = this.select_day;
      let hour_start_day = this.hour_start;
      let hour_finally_day = this.hour_finally;
      this.dialogDay = false;
    }

    saveGropup() {
    if (this.name.valid && this.code.valid) {
      //EL SERVICIO DE AUTH
     let name_send=this.name.value;
     let code_send=this.code.value;
     let days_week_send=this.select_days_week.values;
     let hour_start_send;
     let hour_finally_send;
     let emails_send=this.emails.values;
     let course_send=this.courses.values;
      let credential = { name:name_send, code:code_send, days_week:days_week_send,hour_start:hour_start_send, 
        hour_finally:hour_finally_send, emails:emails_send, course:course_send};
      console.log(credential);
      this.groupService.update(this.group._id,credential).subscribe(response => {
        console.log(response);
        this.loading = false;
        let res: any = response;
        //Guardar en el sesion
        this.navCotroller.navigateRoot('group');
        this.presentToastOk(res.body.body.msj);
      },err => {
        this.presentToastError(err.error.body.msj);
      });
    }
      
    }
 

    sendEmail(){
      if(this.email.valid){
        let email_send = this.email.value + "@jdc.edu.co";
        let data = {emails:email_send};
        this.groupService.addEmails(data).subscribe(response =>{
          let res: any = response;
          this.presentToastOk(res.body.body.msj);
        },err => {
          this.presentToastError(err.error.body.msj);
        });
      }
      
    }
   focus() {
     this.isKeyboardOpen = true;
   }
   focusout() {
     this.isKeyboardOpen = false;
   }
   back(){
    this.navCotroller.navigateRoot('group');
   }
   /**
    * Devuelve el mensaje de name incorrecto
    */
   getErrorMessageName() {
     return this.name.hasError("required")
       ? 'El nombre es obligatorio'
       : this.name.hasError("minlength")
       ? 'Ingresa un nombre de almenos cinco letras'
       : this.name.hasError("maxlength")
       ?'El nombre no puede tener más de treinta letras'
       : "";
   }

  /**
    * Devuelve el mensaje de code incorrecto
    */
  getErrorMessageCode() {
    return this.code.hasError("required")
      ? 'El código es obligatorio'
      : this.code.hasError("minlength")
       ? 'Ingresa un código de almenos cinco dígitos'
       : this.code.hasError("maxlength")
        ?'El código no puede tener más de 8 dígitos'
       : "";
  }

   /**
   * Devuelve el mensaje de email incorrecto
   */
    getErrorMessageEmail() {
      return this.email.hasError("required")
        ? 'El correo es obligatorio'
        : "";
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
