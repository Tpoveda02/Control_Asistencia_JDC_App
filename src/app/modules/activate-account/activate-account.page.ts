import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { VerifyEmail } from 'src/app/models/reset-password/verify-email';
import { ActivationCode } from 'src/app/models/user/code-activation/activation-code';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.page.html',
  styleUrls: ['./activate-account.page.scss'],
})
export class ActivateAccountPage implements OnInit {
  /**
   * Mensaje de error
   */
  public errorMessage: string;
  /**
   * Email para enviar la contraseña
   */
  public code: FormControl;
  /** Focus del teclado*/
  public isKeyboardOpen: boolean;

  constructor(
    private loadingService: LoadingService,
    public navCotroller: NavController,
    private authService: AuthService,
    public toastController: ToastController,
  ) {
    this.code = new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
    this.isKeyboardOpen = false;
  }

  ngOnInit() {

  }

  sendCode() {
    if (this.code.valid) {
      this.loadingService.presentLoading().then(()=> {
        this.authService.sendActivationCode(new ActivationCode(this.code.value)).subscribe(res => {
          if (res.detail == "verified account") {
            this.presentToastOk(this.translate.instant('activate_account.data.account_verificated'));
            this.loadingService.dismissLoading().then(()=> {
              this.navCotroller.navigateBack(["login"]);
            }); 
          }
        }, err => {
          this.loadingService.dismissLoading();
          if (err.error.detail == "code not found") {
            this.presentToastError(this.translate.instant('activate_account.error.wrong_code'));
          }
        });
      });

    }
  }
  focus(){
    this.isKeyboardOpen = true;
  }
  focusout(){
    this.isKeyboardOpen = false;
  }

  /**
   * Devuelve el mensaje de email de recuperación incorrecto
   */
  getErrorMessagecode() {
    return this.code.hasError("required")
      ? this..('activate_account.error.required_value')
      : "";
  }
  getErrorMessageCode() {
    return this.code.hasError("minlength")
      ? this.translate.instant('activate_account.error.code_min_max')
      : this.code.hasError("maxlength")
        ? this.translate.instant('activate_account.error.code_min_max')
        : this.code.hasError("required")
          ? this.translate.instant('activate_account.error.required_value')
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
  
}