import { Injectable } from '@angular/core';
import {Course} from '../../models/course.model';
import { Global } from '../../models/global/global';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  post(data){
    return this.http.post(Global.URL+'course/',data,{ observe: 'response' });
  }
  getCourses(){
    return this.http.get<any>(Global.URL+'course',{ observe: 'response' });
  }

  getCourse(course: Course){
    return this.http.post<any>(Global.URL+'course/:', course,{ observe: 'response' });
  }
  getById(id: String){
    return this.http.get<any>(Global.URL+'course/:'+ id,{ observe: 'response' });
  }
  update(id,course: Course){
    return this.http.put<any>(Global.URL+'course/'+ id, course,{ observe: 'response' });
  }
  delete(id: string){
    return this.http.delete<any>(Global.URL+'course/'+ id);
  }
  removeCourse(){
    if(typeof Storage != "undefined"){
        sessionStorage.removeItem("user_login");
    }
}

}


