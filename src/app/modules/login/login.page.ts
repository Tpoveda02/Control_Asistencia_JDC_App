import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import sha1 from 'js-sha1'
import { ToastController, NavController, Platform } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


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
   *  Validador del email
   */
  public email: FormControl;

  /**
   * Validador de la contraseña
   */
  public password: FormControl;

  /** Focus del teclado*/
  public isKeyboardOpen: boolean;
  public loading: boolean;

  constructor(
    public toastController: ToastController, private authService: AuthService,  private userService:UserService,
    public navCotroller: NavController,
    public plt: Platform,
  ) {
    this.hide = true;
    this.existUser = true;
    this.email = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);
    this.isKeyboardOpen = false;
    this.loading = false;
  }
  ngOnInit(): void {

  }
  /**
   * Método de inicio de sesión
   */
  singIn() {
    this.loading = true;
    if (this.email.valid && this.password.valid) {
      //EL SERVICIO DE AUTH
      let email_final = this.email.value + "@jdc.edu.co";
      let pass_final = sha1(this.password.value);
      let credential = { email: email_final, password: pass_final };
      console.log(credential);
      this.authService.login(credential).subscribe(response => {
        console.log(response);
        this.loading = false;
        let res: any = response;
        //Guardar en el sesion
        this.userService.storageUser(res.body.user)
        this.authService.storageToken(res.body.token);
        this.navCotroller.navigateRoot('home');
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
      : "";
  }

  /**
   * Devuelve el mensaje de password incorrecto
   */
  getErrorMessagePassword() {
    return this.password.hasError("required")
      ? 'La contraseña es obligatoria'
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