import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterEventService {

  constructor(private http:HttpClient) { }

  registerEvent(ob:any){
   return this.http.post("http://localhost/event_backend/registerEvent.php",ob);
  }

  registerEventUser(){
    return this.http.get("http://localhost/event_backend/getRegisterEventUser.php");
  }

  
}
