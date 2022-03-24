import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../models/global/global';
import {Role} from '../../models/role.model';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<any>(Global.URL+'user');
  }
  getUser(role: Role){
    return this.http.post<any>(Global.URL+'user', role);
  }
  getById(id: String){
    return this.http.get<any>(Global.URL+'user/'+ id);
  }
  update(id,role: Role){
    return this.http.put<any>(Global.URL+'user/'+ id, role);
  }
  delete(id: string){
    return this.http.delete<any>(Global.URL+'user/'+ id);
  }
  
}
