import { AfterViewInit, Component } from '@angular/core';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';
import * as $ from 'jquery';
// import 'jquery-datetimepicker';
@Component({
  selector: 'app-organized-event',
  templateUrl: './organized-event.component.html',
  styleUrls: ['./organized-event.component.css']
})
export class OrganizedEventComponent implements AfterViewInit{

  dtOptions: DataTables.Settings = {};

  eventData:any="";

  constructor(private oe:OrganizedEventsService){

  }
  ngOnInit(){
    this.getData()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getData(){
    this.oe.getAllEventData().subscribe((data:any)=>{
      this.eventData = data
      console.log(data)
    })
  }
  // $(document).ready(function(){

  // })
  ngAfterViewInit(){
    // $("mat-label").html("hello")
      // $(".datetimepicker").each(function () {
      //   $(this).datetimepicker();
      // });
  }
  event_name: string = "";
  registerFees:string="";
  registerStartDate:string="";
  registerEndDate:string="";
  eventStartDate:string="";
  eventEndDate:string="";
  eventDetails:string="";
  first_prize:string="";
  second_prize:string="";
  third_prize:string="";
  file:any = "";
  first_prize_image:string="";
  second_prize_image:string="";
  third_prize_image:string="";

  fileUpload(event:any){
    this.file=event.target.files[0];
    console.log(event.target.files[0])
  }

  fileUpload1(event:any){
    this.first_prize_image=event.target.files[0];
    console.log(event.target.files[0])
  }

  fileUpload2(event:any){
    this.second_prize_image=event.target.files[0];
    console.log(event.target.files[0])
  }

  fileUpload3(event:any){
    this.third_prize_image=event.target.files[0];
    console.log(event.target.files[0])
  }

  postOrganizedEvent(){
    const formData = new FormData();
      formData.append("action", "registerUser");
      formData.append("event_name", this.event_name);
      formData.append("registerFees",this.registerFees);
      formData.append("registerStartDate",this.registerStartDate);
      formData.append("registerEndDate",this.registerEndDate);
      formData.append("eventStartDate",this.eventStartDate);
      formData.append("eventEndDate",this.eventEndDate);
      formData.append("eventDetails",this.eventDetails);
      formData.append("first_prize",this.first_prize);
      formData.append("second_prize",this.second_prize);
      formData.append("third_prize",this.third_prize);
      formData.append("event_images", this.file);
      formData.append("first_prize_image", this.first_prize_image);
      formData.append("second_prize_image", this.second_prize_image);
      formData.append("third_prize_image", this.third_prize_image);

    // this.oe.postEventData({event_name:this.event_name,registerFees:this.registerFees,registerStartDate:this.registerStartDate,
    //   registerEndDate:this.registerEndDate,eventStartDate:this.eventStartDate,eventEndDate:this.eventEndDate,eventDetails:this.eventDetails,action:"insertEventsOrganized"}).subscribe((data:any)=>{
      this.oe.postEventData(formData).subscribe((data:any)=>{
      this.eventData = data;
    })
  }

  delete(event:any){
    alert(event.target.id)
    const formData = new FormData();
    formData.append("sr_id",event.target.id)

    this.oe.deleteEventData(formData).subscribe((data:any)=>{
      alert("deleted successfully.!")
    })
  }
}
