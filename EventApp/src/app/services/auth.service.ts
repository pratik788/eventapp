import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginService(ob:any){
    return this.http.post("http://localhost/event_backend/api.php",ob);
  }

  registerUser(ob:any){
    return this.http.post("http://localhost/event_backend/registerUser.php",ob);
  }

  changepass(ob:any){
    return this.http.post("http://localhost/event_backend/apidata.php",ob);
  }
}
