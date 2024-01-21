import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  user_type:any;
  user_id: any;
  newpass:string = "";
  currentpass:string="";
  confirmpass:string="";

  flag:boolean = true;

  constructor(private router:Router, private auth:AuthService){}

  ngOnInit(){
    this.user_type = sessionStorage.getItem("user_type");
    this.user_id = sessionStorage.getItem("email");
    // alert(this.user_type)
  }

  logout(){
      sessionStorage.clear()
      this.router.navigate(['/'])
  }

  changepass(){
    if(this.newpass ==""){
      this.flag =  false
      alert("enter new password")
    }
     if(this.currentpass ==""){
      this.flag =  false
      alert("enter current password")
    } 
     if(this.confirmpass ==""){
      this.flag =  false
      alert("enter confirm password")
    }

    if(this.newpass == this.confirmpass){
      this.flag = true
    }else{
      this.flag = false
      alert("new password and confirm password not matched!")
    }

    if(this.flag){
      alert("ok")
      const formData = new FormData();
      formData.append("newpassword",sha256(this.newpass));
      formData.append("confirmpassword",sha256(this.confirmpass));
      formData.append("currentpassword",sha256(this.currentpass));
      formData.append("action","changepass");
      formData.append("user_id",this.user_id);

      this.auth.changepass(formData).subscribe((data:any)=>{
        console.log(data);
      })
    }
  }
}