import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { cleanData } from 'cypress/types/jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'SmoothScrolling';
  Data: any = [];
  public Events : Array<any> = [];
  public day : Array<number> = [];
  public month : Array<number> = [];
  public year : Array<number> = [];

  localUrl = 'assets/session-events.json';

  public  counter:number = 0;

  constructor(private httpClient: HttpClient) { }

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

      console.log(this.Data)
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

      let intervalAllEvents = setInterval(() => {
                
        if (this.counter == this.Events.length-1) {
          clearInterval(intervalAllEvents);
        }
         let intervalEachEvent = setTimeout(() => {
            console.log(this.counter);
            if (this.counter == this.Events.length-1) {
              clearTimeout(intervalEachEvent);
            }
            if(this.counter >= 1){
              let theDiv: HTMLElement = document.getElementById("container")   as HTMLElement;  
              top++;
              theDiv.scrollTop = 80*top;
              this.counter++; 
            }
           
          }, this.Events[this.counter].duration); 
          
        
      }, 1000); 
   }

  }



   


   