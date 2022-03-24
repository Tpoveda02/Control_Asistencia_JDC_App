import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { ConfirmationService } from "primeng/api";
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group/group.service';
import { User } from '../../models/user.model';
import { PrimeNGConfig } from "primeng/api";



@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.page.html',
  styleUrls: ['./group-detail.page.scss'],
})
export class GroupDetailPage implements OnInit {


  // Variable Group
  public group: Group;

  // Variable Student
  public students: User[];
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

  /** Focus del teclado*/
  public isKeyboardOpen: boolean;
  public selectDays: boolean;

  public loading: boolean;
  public id_Group: string;


  constructor(
    public toastController: ToastController, public groupService: GroupService,
    public navCotroller: NavController, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService, public plt: Platform
  ) {

    this.isKeyboardOpen = false;
    this.loading = true;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.activatedRoute.paramMap.subscribe(idGroup => {
      this.id_Group = idGroup.get('_id');
      console.log(this.id_Group);
      this.getGroup();
    });
  }

  getGroup() {
    this.loading = true;
    this.groupService.getGroup(this.id_Group).subscribe(data => {
      console.log(data);
      this.group = data.body.body.group;
      this.students = data.body.body.group.students;
      console.log(data.body.body.group.days_week);
      this.loading = false;
    });
  }

  deleteGroup() {
    this.confirmationService.confirm({
        message: '¿Quieres eliminar el ' + this.group.name + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.groupService.deleteGroup(this.group._id).subscribe(response => {
                console.log(response);
                let res: any = response;
                this.navCotroller.navigateRoot('group');
                this.presentToastOk(res.boby.body.msj);
             },err => {
                this.presentToastError(err.error.body.msj);
            })
        }
    });  
  }
  focus() {
    this.isKeyboardOpen = true;
  }
  focusout() {
    this.isKeyboardOpen = false;
  }
  back() {
    this.navCotroller.navigateRoot('group');
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


