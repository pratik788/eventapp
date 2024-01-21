import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private BASE_URL:string = "http://localhost/event_backend/";

  constructor(private http:HttpClient) { }

  getResult(){
    return this.http.get("http://localhost/event_backend/getResult.php");
  }
  postResult(ob:any){
   return this.http.post("http://localhost/event_backend/addResult.php",ob);
  }
  updateResult(){
  }
  deleteResult(ob:any){
    return this.http.post("http://localhost/event_backend/deleteResult.php",ob);
  }

  getUserHistory(ob:any){
    return this.http.post(this.BASE_URL+"user_history.php",ob);
  }
}
