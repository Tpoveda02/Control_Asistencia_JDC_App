import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Global } from 'src/app/models/global/global';
import { Teacher } from 'src/app/models/teacher.model';
import { AuthService } from '../../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient, private authService:AuthService){}
//Agregar un correo del docente
  post(dataEmail){
    return this.http.post(Global.URL+'/teacherConfig',dataEmail);
  }
  //Obtener TODOS los correos
  getAll(){
      return this.http.get(Global.URL+'/teacherConfig');
  }
  //Obtener un correo por medio del ID
  getById(id: String){
    return this.http.get(Global.URL+'/teacherConfig/:'+ id);
  }
    //Modificar un correo
  update(id,dataEmail){
    return this.http.put(Global.URL+'/teacherConfig/:'+ id, dataEmail);
  }
  //Eliminar un correo
  delete(id: string){
    return this.http.delete(Global.URL+'/teacherConfig/:'+ id);
  }
}
