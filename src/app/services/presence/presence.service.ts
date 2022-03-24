import { Injectable } from '@angular/core';
import { Global } from '../../models/global/global';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private http: HttpClient) { }

  post(data){
    return this.http.post(Global.URL+'presence/',data,{ observe: 'response' });
  }
  update(id,presence){
    return this.http.put<any>(Global.URL+'presence/'+ id, presence,{ observe: 'response' });
  }
  get(){
    return this.http.get<any>(Global.URL+'presence/',{ observe: 'response' });
  }
  getAll(id){
    return this.http.get<any>(Global.URL+'presence/'+ id,{ observe: 'response' });
  }
  delete(id: String){
    return this.http.delete<any>(Global.URL+'presence/'+ id,{ observe: 'response' });
  }
  studentsPresent(data){
    return this.http.post<any>(Global.URL+'presence/studentsToday/'+ data,{ observe: 'response' });
  }
  byData(data){
    return this.http.post<any>(Global.URL+'presence/presenceByDates'+ data,{ observe: 'response' });
  }
}
