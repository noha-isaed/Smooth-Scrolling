import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-play-events',
  templateUrl: './play-events.component.html',
  styleUrls: ['./play-events.component.css']
})
export class PlayEventsComponent implements OnInit {

  title = 'SmoothScrolling';
  Data: any = [];
  public Events : Array<any> = [];


  localUrl = 'assets/session-events.json';

  public  counter:number = -1;

  constructor(private httpClient: HttpClient, private service : ServiceService) { }

  ngOnInit(): void {
    let index = 0;
    this.httpClient.get(this.localUrl).subscribe(data =>{
      this.Data = data ; 

      for(let i = 0 ; i < this.Data.length-1 ; i++){
             //  // add duration to each event 
             var time1 = new Date(this.Data[i].timestamp * 1000).getTime();
             var time2 = new Date(this.Data[i + 1].timestamp * 1000).getTime();

             var dif = time2 - time1;

             var Seconds_from_T1_to_T2 = dif / 1000;
             var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
             this.Data[i].duration = Seconds_Between_Dates;

           //  convert timestamp to hours:minute:second
           var date = new Date(this.Data[i].timestamp * 1000);
           var hour = date.getHours();
           var minute = ("0" + date.getMinutes()).substr(-2);
           var second = ("0" + date.getSeconds()).substr(-2);
           this.Data[i].timestamp =   hour + ':' + minute+ ':' + second;
      }

      for(let i = 0 ; i < this.Data.length ; i++){
          if(this.Data[i].type == 4 || (this.Data[i].type === 3 && this.Data[i].data.source == 2 && this.Data[i].data.type == 2) ) {
            this.Events.push(this.Data[i]);
         }
      }    

      for(let i = 0 ; i < this.Events.length ; i++){
           // add Icons to each event
            if(this.Events[i].type == 3 ) {this.Events[i].icon = "fa fa-hand-pointer-o" }
            else  if(this.Events[i].type == 4 ) {this.Events[i].icon = "fa fa-mouse-pointer" }

            // add description to each event
            if(this.Events[i].type == 3 ) {this.Events[i].description = "Click" }
            else  if(this.Events[i].type == 4 ) {this.Events[i].description = "Visit New Page" }

            // add idex to each event 
            this.Events[i].index =  i ; 
      }

    })

  }


  NavigateEvents(anchor: string): void {
   
      let top = 0 ;
      this.counter++;
       let flag = 0;
       
      let intervalAllEvents = setInterval(() => {
        this.service.setCounterValue(this.counter); 
        
        if(this.service.getFlagValue() == 1){
          console.log(this.service.getFlagValue())
          for(let i = 0 ; i < this.Events.length ; i++){
            if(this.service.getCounterValue() == this.Events[i].index){
              this.Events[i].comment  =  this.service.gatDataFromTextArea();

            }
          }
        }

        if (this.counter == this.Events.length-1) {
          clearInterval(intervalAllEvents);
        }

         let intervalEachEvent = setTimeout(() => {

            if(this.counter >= 0){
              let theDiv: HTMLElement = document.getElementById("container")   as HTMLElement;  
              top++;
              theDiv.scrollTop = 60*top;
              this.counter++; 
            }
           
          }, this.Events[this.counter].duration); 
          
        
      }, 1000); 
   }

}
