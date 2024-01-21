import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/app/services/auth.service';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthService, private router:Router){}
  user_id:string="";
  password:string="";
  action:string="signin";
  

  login(){
    this.password =sha256(this.password)
    this.authService.loginService({user_id:this.user_id,password:this.password,action:this.action}).subscribe((data:any)=>{
        // console.log(data)
        // if(data == "login successfully.!"){
        //     (<HTMLElement>document.querySelector(".alert-success")).style.display = 'block';
        //     (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
        //     (<HTMLElement>document.querySelector(".alert-success")).innerHTML = "login successfully.!";
        //     localStorage.setItem("token","loggedIn");
        //     this.router.navigate(['/auth/dashboard']);
            
        // }else 
        if(data == "invalid user id or password.!"){
            (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
            (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = data;
            (<HTMLElement>document.querySelector(".alert-success")).style.display = 'none';
            localStorage.clear()
        }else{
          (<HTMLElement>document.querySelector(".alert-success")).style.display = 'block';
          (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
          (<HTMLElement>document.querySelector(".alert-success")).innerHTML = "login successfully.!";
          
          sessionStorage.setItem("token","loggedIn");
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("user_type", data.user_type);

          if(data.user_type == "Admin"){
            this.router.navigate(['/auth/dashboard']);
          }else if(data.user_type == "User"){
            this.router.navigate(['/user/user-dashboard']);
          }
        }        
    })
}
}
