import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizedEventsService {

  constructor(private http:HttpClient) { }

  getEventData(){
    return this.http.get("http://localhost/event_backend/getEvent.php");
  }

  getAllEventData(){
    return this.http.get("http://localhost/event_backend/getAllEvent.php");
  }
  postEventData(ob:any){
    return this.http.post("http://localhost/event_backend/addEvent.php",ob);
  }

  updateEventData(ob:any){
    return this.http.post("",ob);
  }

  deleteEventData(ob:any){
    return this.http.post("http://localhost/event_backend/deleteEvent.php",ob);
  }

  getEventDataById(ob:any){
    return this.http.post("http://localhost/event_backend/getEventDataById.php",ob);
  }
}
