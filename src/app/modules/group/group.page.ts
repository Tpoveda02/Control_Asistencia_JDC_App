import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, Platform } from '@ionic/angular';
import { GroupService } from 'src/app/services/group/group.service';
import { CourseService } from 'src/app/services/course/course.service'; 
import { Group } from 'src/app/models/group.model';
import { Course } from 'src/app/models/course.model';
import { ConfirmationService } from 'primeng/api';
import { Validators, FormControl } from '@angular/forms';
import { PrimeNGConfig } from "primeng/api";
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
// Variable curso
public selectCourse:FormControl;
    /**
  *  Validador del nombre 
  */
     public name: FormControl;

     /**
     *  Validador del codigo
     */
     public code: FormControl;
   
     groupDialog: boolean;

    groups: Group[];

    courses: Course[];
    course: Course;
    selectedCourses: any[];

    group: Group;

    selectedGroups: Group[];
    public user:User;
    submitted: boolean;

    public loading: boolean;


    public isKeyboardOpen: boolean;

    constructor(
      public toastController: ToastController,private userService:UserService, private groupService: GroupService,
      public navCotroller: NavController, public plt: Platform,private courseService: CourseService,
      private primengConfig: PrimeNGConfig, private confirmationService: ConfirmationService) { 
      this.name = new FormControl("", [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);
      this.code = new FormControl("", [Validators.required,Validators.minLength(3), Validators.maxLength(8)]);
      this.selectCourse = new FormControl("", [Validators.required]);
          }
    ngOnInit() {
      this.user = this.userService.getStorageUser();
      this.getGroups();
      this.primengConfig.ripple = true;
      this.getAllCourses();
      this.saveGroup();
    } 
      focus() {
        this.isKeyboardOpen = true;
      }
      focusout() {
        this.isKeyboardOpen = false;
      }
    
    openNew() {
        this.submitted = false;
        this.groupDialog = true;
    }
    getAllCourses(){
      this.courseService.getById("sdfdagfd").subscribe(data => {
        this.course = data.body.body.course;

      })
      this.courseService.getCourses().subscribe(data => {
        console.log(data);
        this.courses=data.body.body.course;
      });
    }

    getGroups(){
      //llAMAR EL SERVICIO OBTENER 
      if(this.user.role.level == 2){
        console.log('Docente');
        this.userService.getGroupsTeacher(this.user._id).subscribe(res=>{
          console.log(res);
          this.groups = res.body.group;
        });
        
      }else if(this.user.role.level == 3){
        console.log('Estudiante');
        this.userService.getGroupsStudent(this.user._id).subscribe(res=>{
          console.log(res);
          this.groups = res.body.group;

        });
  
      }
    }

    saveGroup() {
        if (this.name.valid && this.code.valid) {
        //   Registrar grupo
        let course_send = this.selectCourse.value;
        let name_send = this.name.value;
        let code_send = this.code.value;
        let teacher_send =  this.user;
        let data_group = {name:name_send, code:code_send, course: course_send, teacher:teacher_send};
          console.log(data_group);
          this.groupService.post(data_group).subscribe(response => {
            console.log(response);
            let res: any = response;
            this.groupDialog = false;
            this.presentToastOk(res.body.boby.msj);
          },err => {
            this.presentToastError(err.error.body.msj);
          })
        }
      }

    deleteGroup(group: Group) {
        this.confirmationService.confirm({
            message: '¿Quieres eliminar el ' + group.name + '?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.groupService.deleteGroup(group._id).subscribe(response => {
                    console.log(response);
                    let res: any = response;
                    this.presentToastOk(res.boby.body.msj);
                 },err => {
                    this.presentToastError(err.error.body.msj);
                });
            }
        });   
    }

    hideDialog() {
        this.groupDialog = false;
        this.submitted = false;
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
   * Devuelve el mensaje de code incorrecto
   */
  getErrorMessageCourse() {
    return this.selectCourse.hasError("required")
      ? 'El curso es obligatorio'
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

