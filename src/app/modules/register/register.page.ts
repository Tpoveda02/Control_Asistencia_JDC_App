import sha1 from 'js-sha1'
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ToastController, NavController, Platform } from '@ionic/angular';
import { Global } from 'src/app/models/global/global';
import { UserService } from '../../services/user/user.service';
// Importar el ViewChild para acceder a un elemento del DOM

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
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
  *  Validador del nombre completo
  */
  public full_name: FormControl;
 
  /**
  * Validador del número de identificación
  */
  public identification_card: FormControl;
  /**
  *  Validador del email
  */
  public email: FormControl;

  /**
  * Validador del nombre de usuario
  */
   public name_user: FormControl;
   /**
  /**
  * Validador de la contraseña
  */
  public password: FormControl;
   /**
  * Validador de la segunda contraseña
  */
    public password_validator: FormControl;
   /**
    * Validador de la contraseña
    */
  public state: FormControl;
 
   /** Focus del teclado*/
  public isKeyboardOpen: boolean;
 
   /** Focus data*/
   data_header =  {DOCENTE: "Ricardo", CURSO: "ANALISIS ALGORITMOS", GRUPO: "G1XD",PROGRAMA: "INGENIERIA SISTEMAS", SEMESTRE: "6" };
  data_body = [{NOMBRE:"TANIAH ZOEL POVEDA", FECHA:"12/10/2020", ESTADO: "R" },
  {NOMBRE:"NATALIA BENAVIDES SANABRIA", FECHA:"12/10/2020", ESTADO: "R" },
  {NOMBRE:"DAVID CORTES SIERRA", FECHA:"12/10/2020", ESTADO: "R" },
  {NOMBRE:"SERGIO SALAS GONZALEZ", FECHA:"18/10/2020", ESTADO: "R" },
  {NOMBRE:"SARA PEREZ POVEDA", FECHA:"18/10/2020", ESTADO: "R" }
];
   constructor(
     public toastController: ToastController, public userService: UserService,
     public navCotroller: NavController,
     public plt: Platform,
   ) {
     this.hide = true;
     this.existUser = true;
     this.name_user = new FormControl("", [Validators.required,Validators.minLength(5), Validators.maxLength(20)]);
     this.identification_card = new FormControl("", [Validators.required,Validators.minLength(7), Validators.maxLength(10)]);
     this.full_name = new FormControl("", [Validators.required,Validators.minLength(3), Validators.maxLength(60)]);
     this.email = new FormControl("", [Validators.required,Validators.minLength(5), Validators.maxLength(50)]);
     this.password = new FormControl("", [Validators.required,Validators.minLength(8), Validators.maxLength(16)]);
     this.password_validator = new FormControl("", [Validators.required,Validators.minLength(8), Validators.maxLength(16)]);
     this.isKeyboardOpen = false;
   }
   ngOnInit(): void {
 
   }
   /**
    * Método de registro
    */
    saveUser() {
      if (this.email.valid && this.full_name.valid && this.name_user.valid && this.identification_card.valid
         && this.name_user.valid && this.password.value == this.password_validator.value) {
        //EL SERVICIO DE AUTH
        let fullName_send = this.full_name.value;
        let UserName_send = this.name_user.value;
        let idCard_send = this.identification_card.value;
        let email_send = this.email.value + "@jdc.edu.co";
        let pass_send = sha1(this.password.value);
        let info_user = { name_user:UserName_send,identification_card:idCard_send,
          password:pass_send,email: email_send, full_name:fullName_send};
        console.log(info_user);
        this.userService.post(info_user).subscribe(response => {
          console.log(response);
          let res: any = response;
          //Guardar en el sesion
          this.userService.storageUser(res.body.token);
          this.navCotroller.navigateRoot('login');
          this.presentToastOk(res.body.msj);
        },err => {
          this.presentToastError(err.error.body.msj);
        })
      }
    }
 
   focus() {
     this.isKeyboardOpen = true;
    

      
   }
   focusout() {
     this.isKeyboardOpen = false;
   }
   /**
    * Devuelve el mensaje de email incorrecto
    */
   getErrorMessageEmail() {
     return this.email.hasError("required")
       ? 'El correo es obligatorio'
       : this.email.hasError("minlength")
       ? 'Ingresa un correo de almenos cinco letras'
       : this.email.hasError("maxlength")
       ?'El correo no puede tener más de cincuenta letras'
       : "";
   }
    /**
    * Devuelve el mensaje de full_name incorrecto
    */
   getErrorMessageFullName() {
     return this.full_name.hasError("required")
       ? 'El nombre es obligatorio'
       : this.full_name.hasError("minlength")
       ? 'Ingresa un nombre de almenos tres letras'
       : this.full_name.hasError("maxlength")
       ?'El nombre no puede tener más de sesenta letras'
       : "";
   }
   /**
    * Devuelve el mensaje de name_user incorrecto
    */
   getErrorMessageNameUser() {
    return this.name_user.hasError("required")
      ? 'La nombre de usuario es obligatorio'
      : this.name_user.hasError("minlength")
      ? 'Ingresa un nombre de usuario de almenos cinco letras'
      : this.name_user.hasError("maxlength")
      ?'El nombre de usuario no puede tener más de veinte letras'
      : "";
  }
  /**
    * Devuelve el mensaje de identification_card incorrecto
    */
  getErrorMessageIdCard() {
    return this.identification_card.hasError("required")
      ? 'El número de identificación es obligatorio'
      : this.identification_card.hasError("minlength")
      ? 'Ingresa un número de identificación de almenos siete números'
      : this.identification_card.hasError("maxlength")
      ?'El número de identificación no puede tener más de diez números'
      : "";
  }
  /**
    * Devuelve el mensaje de password incorrecto
    */
  getErrorMessagePassword() {
    return this.password.hasError("required")
      ? 'La contraseña es obligatoria'
      : this.password.hasError("minlength")
      ? 'Ingresa una contraseña de almenos ocho letras'
      : this.password.hasError("maxlength")
      ?'La contraseña no puede tener más de 16 letras'
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