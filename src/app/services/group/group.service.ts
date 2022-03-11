import { Injectable } from '@angular/core';
import {Group} from '../../models/group.model';
import { Global } from '../../models/global/global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }
  post(data){
    return this.http.post(Global.URL+'group',data,{ observe: 'response' });
  }
  getGroups(){
    return this.http.get<any>(Global.URL+'group',{ observe: 'response' });
  }
  getCourse(group: Group){
    return this.http.post<any>(Global.URL+'group/', group,{ observe: 'response' });
  }
  getGroup(id){
    return this.http.get<any>(Global.URL+'group/'+ id,{ observe: 'response' });
  }
  update(id,group){
    return this.http.put<any>(Global.URL+'group/'+ id, group,{ observe: 'response' });
  }
  deleteGroup(id: String){
    return this.http.delete<any>(Global.URL+'group/'+ id,{ observe: 'response' });
  }
  teacherGroupsDay(data){
    return this.http.post<any>(Global.URL+'group/groupTeacherByDay/',data,{ observe: 'response' });
  }
  studentGroupsDay(data){
    return this.http.post<any>(Global.URL+'group/groupStudentByDay/', data,{ observe: 'response' });
  }
  addEmails(data){
    return this.http.put<any>(Global.URL+'group/addStudents/'+ data,{ observe: 'response' });
  }
}






