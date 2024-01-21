import { Component } from '@angular/core';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';
import { ResultService } from 'src/app/services/result.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-auth-result',
  templateUrl: './auth-result.component.html',
  styleUrls: ['./auth-result.component.css']
})
export class AuthResultComponent {
event_name:string="";
event_id:string="";
first_prize:string="";
second_prize:string="";
third_prize:string="";

dtOptions: DataTables.Settings = {};

resultData:any;
eventData:any;

constructor(private result:ResultService,private oe:OrganizedEventsService){}

ngOnInit(){
  // this.result.getResult().subscribe((data:any)=>{
  //     this.resultData = data
  // })
  this.getEventData()
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true
  };

  this.getData()
}

  submitData(){
    const formData = new FormData();
    formData.append("event_name",this.event_name);
    formData.append("event_id",this.event_id);
    formData.append("first_prize",this.first_prize);
    formData.append("second_prize",this.second_prize);
    formData.append("third_prize",this.third_prize);

    this.result.postResult(formData).subscribe((data:any)=>{
       alert(data)
       this.getData();
    })
  }

  getEventData(){
    this.oe.getEventData().subscribe((data:any)=>{
      this.eventData = data
      console.log(data)
    })
  }

  getData(){
    this.result.getResult().subscribe((data:any)=>{
        this.resultData = data
    })
  }

  deleteResult(event:any){

    if(confirm("are sure want to delete this?")){
      alert(event.target.id)
      const id = event.target.id;
      const ids = id.split('-')
      const formData = new FormData()
      formData.append("sr_id",ids[1])
      this.result.deleteResult(formData).subscribe((data:any)=>{
        alert("deleted successfully.!")
        this.getData();
      })
    }

  }
}
