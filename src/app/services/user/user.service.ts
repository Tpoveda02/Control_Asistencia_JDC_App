import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from 'src/app/models/global/global';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  post(data){
    return this.http.post(Global.URL+'user/',data,{ observe: 'response' });
  }
  get(user: User){
    return this.http.post<any>(Global.URL+'user/', user,{ observe: 'response' });
  }
  update(id,user){
    return this.http.put<any>(Global.URL+'user/'+ id, user,{ observe: 'response' });
  }
  delete(id: String){
    return this.http.delete<any>(Global.URL+'user/'+ id,{ observe: 'response' });
  }
  getGroupsTeacher(id){
    return this.http.get<any>(Global.URL+'teacherAll/'+ id,{ observe: 'response' });
  }
  getGroupsStudent(id){
    return this.http.get<any>(Global.URL+'StudentAll/'+ id,{ observe: 'response' });
  }
  coordinate(id,data){
    return this.http.put<any>(Global.URL+'coordinate/'+ id,data,{ observe: 'response' });
  }

  removeUser() {
    if (typeof Storage != "undefined") {
      sessionStorage.removeItem("user_login");
    }
  }
  storageUser(user) {
    this.removeUser();
    let storageWell: boolean = true;
    if (typeof (Storage) !== "undefined") {
      if (user != null) {
        sessionStorage.setItem("user_login", JSON.stringify(user));
      } else {
        storageWell = false;
      }
    } else {
      alert("Update your navigator");
      storageWell = false;
    }
    return storageWell;
  }

  getStorageUser(): User {
    let token: User;
    if (typeof Storage != "undefined") {
        token = JSON.parse(sessionStorage.getItem("user_login"));
    } else {
        token = null;
    }
    return token;
}

}
