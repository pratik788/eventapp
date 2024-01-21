import { Component } from '@angular/core';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  full_name:string="";
  email:string="";
  mob_no:string="";
  password:string="";
  confirm_password:string=""
  terms:boolean=false;
  file:any ="";
  constructor(private auth:AuthService){}

  doAction(event:any){
    this.terms = event.target.checked;
  }

  fileUpload(event:any){
    this.file=event.target.files[0];
    console.log(event.target.files[0])
  }

  registerUser(){
    if(this.terms){
      const formData = new FormData();
      formData.append("action", "registerUser");
      formData.append("user_type", "User");
      formData.append("full_name",this.full_name);
      formData.append("email",this.email);
      formData.append("password",sha256(this.password));
      formData.append("mob_no",this.mob_no);
      formData.append("profile_photo", this.file);
      // this.auth.registerUser({action:"registerUser",user_type:"User",full_name:this.full_name,email:this.email,mob_no:this.mob_no,password:sha256(this.password)}).subscribe((data:any)=>{
        // console.log(data)
        this.auth.registerUser(formData).subscribe((data:any)=>{
        if(data == "User Registered successfully.!"){
          (<HTMLElement>document.querySelector(".success-msg")).style.display = 'block';
          (<HTMLElement>document.querySelector(".danger-msg")).style.display = 'none';
          (<HTMLElement>document.querySelector(".success-msg")).innerHTML = "User Registered successfully.! <a href='login'>please click here to redirect login page</a>";
        }else{
          (<HTMLElement>document.querySelector(".success-msg")).style.display = 'none';
          (<HTMLElement>document.querySelector(".danger-msg")).style.display = 'block';
          (<HTMLElement>document.querySelector(".danger-msg")).innerHTML = "Something went wrong.!";
        }
      })
    }

  }

}
