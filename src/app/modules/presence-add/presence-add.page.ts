import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ToastController, NavController, Platform, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/models/group.model';
import { PrimeNGConfig } from "primeng/api";
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { PresenceService } from '../../services/presence/presence.service';
import { Presence } from '../../models/presence.model';
@Component({
  selector: 'app-presence-add',
  templateUrl: './presence-add.page.html',
  styleUrls: ['./presence-add.page.scss'],
})
export class PresenceAddPage implements OnInit {


  // Toggle registrar asistencia.
  public registerAuto:boolean;

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
  * Validador del hora de asistencia 
  */
   public hour_presence: FormControl;

   /**
   * Validador dias a la semana
  */
  public select_days_week: string[];
/**
  * Validador del hora de inicio 
  */
 public hour_start: string;
 /**
* Validador del hora de inicio 
*/
  public hour_finally: string;
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

    public user:User;

    public id_Group: string;

   /** Focus del teclado*/
  public isKeyboardOpen: boolean;
public selectDays:boolean;

  public loading:boolean;


 public presences: Presence[];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;
   constructor(
     public toastController: ToastController, private userService:UserService,public groupService: GroupService,  public presenceService: PresenceService,
     public navCotroller: NavController, private activatedRoute: ActivatedRoute,private primengConfig: PrimeNGConfig,
     public plt: Platform,
   ) {
  
     this.hide = true;
     this.existUser = true;
     this.name = new FormControl("", [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);
     this.code = new FormControl("", [Validators.required,Validators.minLength(3), Validators.maxLength(8)]);
     this.hour_presence = new FormControl(""),[Validators.required];
     this.email = new FormControl("", [Validators.required]);
     this.isKeyboardOpen = false;
     this.loading = false;
     this.registerAuto = true;


     
   }
   ngOnInit() {
    this.primengConfig.ripple = true;
    this.user = this.userService.getStorageUser();
      this.activatedRoute.paramMap.subscribe(idGroup => {
      this.id_Group = idGroup.get('_id');
      this.hour_finally
      this.getGroup();
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
      console.log(data.body.body.group.days_week);
      this.select_days_week = data.body.body.group.days_week;
      this.emails = data.body.body.group.emails;
      this.loading = false;
      });
    }

  
    updtGroup() {
      this.groupService.update(this.group._id, this.group).subscribe(res =>{
        console.log(res);
        this.presentToastOk(res.body.body.msj);
      },err => {
        this.presentToastError(err.error.body.msj);
      });
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
