import { ViewportScroller } from '@angular/common';
import { Component ,ElementRef,OnInit, ViewChild ,AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'SmoothScrolling';

  public Events: Array<any> = [
    {"index": 0,"type": 0, "duration": 3500, "description": "Click event" },
    {"index": 1,"type": 0, "duration": 3000, "description": "Click event"},
    {"index": 2,"type": 1, "duration": 500, "description": "Visit new page event"},
    {"index": 3,"type": 0, "duration": 700,"description": "Click event"},
    {"index": 4,"type": 0, "duration": 4000, "description": "Click event"},
    {"index": 5,"type": 0, "duration": 2000, "description": "Click event"},
    {"index": 6,"type": 2, "duration": 800, "description": "Scroll event"},
    {"index": 7,"type": 0, "duration": 1500, "description": "Click event"},
    {"index": 8,"type": 1, "duration": 500,  "description": "Visit new page event"},
    {"index": 9,"type": 1, "duration": 900, "description": "Visit new page event"},
    {"index": 10,"type": 2, "duration": 3500, "description": "Scroll event"},
    {"index": 11,"type": 2, "duration": 2700, "description": "Scroll event"},
    {"index": 12,"type": 0, "duration": 3200, "description": "Click event"},
    {"index": 13,"type": 1, "duration": 5000, "description": "Visit new page event event"}
  ]


  public time: Array<number> =  [3500,300,500,700,4000,2000,800,1500,500,900,3500,2700,3200,5000]
  ngOnInit(): void {

    for (let i = 0 ; i < this.Events.length ; i++){
      let digit3 = i, digit2 = 0;
     if(i > 5){
       digit3 = Math.floor(this.Events[i].index % 6);
       digit2 =  Math.floor(this.Events[i].index / 6);
     }
      this.Events[i].time = "0"+String(digit2)+":"+String(digit3)+"0";

      if(this.Events[i].type == 0  ) {this.Events[i].icon = "fa fa-hand-pointer-o" }
      else  if(this.Events[i].type == 1 ) {this.Events[i].icon = "fa fa-mouse-pointer" }
      else  if(this.Events[i].type == 2 ) {this.Events[i].icon = "fa fa-angle-double-down" }
    }

    
  }
  public  counter:number = -1;
  
  
  NavigateEvents(anchor: string): void{
    let top = 0 ;
    this.counter++;
        const interval = setInterval(() => {
        console.log(this.Events[this.counter].duration);
        this.counter++;
        if (this.counter >= this.Events.length  ) {
          clearInterval(interval);
        }
        if(this.counter > 6){
          let theDiv: HTMLElement = document.getElementById("container")   as HTMLElement;  
          top++;
          theDiv.scrollTop = 60*top;
      }    
       
      }, this.Events[this.counter].duration);

    }
  
  
  
}
