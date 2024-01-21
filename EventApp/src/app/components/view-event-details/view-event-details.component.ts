import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';
import { RegisterEventService } from 'src/app/services/register-event.service';
declare var Razorpay:any;
@Component({
  selector: 'app-view-event-details',
  templateUrl: './view-event-details.component.html',
  styleUrls: ['./view-event-details.component.css']
})
export class ViewEventDetailsComponent {
  email:any="";
  event_name:string="";
  event_id:string="";
  event_data:any="";
    flag:boolean | undefined;
    constructor(private route:ActivatedRoute, private oe:OrganizedEventsService,private router:Router,private re:RegisterEventService){}
    
    ngOnInit(){

      this.event_name=this.route.snapshot.params['event-name']
      this.event_id=this.route.snapshot.params['id']
      this.email = sessionStorage.getItem("email")

      this.getEventData()
    }

    getEventData(){
      const formData = new FormData();
      formData.append("event_name",this.event_name)
      formData.append("event_id",this.event_id)
      this.oe.getEventDataById(formData).subscribe((data:any)=>{
          this.event_data = data;
          const today = new Date();
          const date2 = new Date(data.register_end_date);
           if(today > date2){
              this.flag = false
           }else{
              this.flag = true
           }
      })
    }

    doAction(){
      sessionStorage.setItem("event_name",this.event_name);
      sessionStorage.setItem("event_id",this.event_id);
      this.router.navigate(['/user/payment']);
    }

    paynow() {
        if(sessionStorage.getItem("user_type")){
              const RazorpayOptions = {
                description : 'sample RazorPay demo',
                currency:'INR',
                amount: 30000,
                name:"ritesh",
                key:'rzp_test_QxSenUPTLcKeFz',
                image:'',
                prefills:{
                  name:'ritesh shedmake',
                  email:'ritesh@gmail.com',
                  phone:'7083231565'
                },
                
                // ... your existing options
                "handler": (response: any) => { 
                  // alert(response.razorpay_payment_id);
                  // alert(response.razorpay_order_id);
                  // alert(response.razorpay_signature);
                  
                  const formData = new FormData();
                  formData.append("payment_id", response.razorpay_payment_id);
                  formData.append("event_name", this.event_name); 
                  formData.append("event_id", this.event_id);
                  formData.append("email",this.email);
          
                  this.re.registerEvent(formData).subscribe((data: any) => {
                    alert(data);

                  });
                },
                theme:{
                  color:'#6466e3'
                },
                modal:{
                  ondismiss:()=>{
                    console.log('dismissed')
                  }
                }
              }
          
              const successCallback = (data:any)=>{
                console.log(data.razorpay_payment_id)
              }
          
              const failureCallback= (e:any)=>{
                console.log(e)
              }
          
              Razorpay.open(RazorpayOptions,successCallback,failureCallback)
      }else{
        alert("please login first...!")
      }
    }
  }

