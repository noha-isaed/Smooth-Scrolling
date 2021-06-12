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
    {"index": 0,"type": 0, "description": "Click event"},
    {"index": 1,"type": 0,"description": "Click event"},
    {"index": 2,"type": 1,"description": "Visit new page event"},
    {"index": 3,"type": 0,"description": "Click event"},
    {"index": 4,"type": 0,"description": "Click event"},
    {"index": 5,"type": 0,"description": "Click event"},
    {"index": 6,"type": 2,"description": "Scroll event"},
    {"index": 7,"type": 0,"description": "Click event"},
    {"index": 8,"type": 1,"description": "Visit new page event"},
    {"index": 9,"type": 1,"description": "Visit new page event"},
    {"index": 10,"type": 2,"description": "Scroll event"},
    {"index": 11,"type": 2,"description": "Scroll event"},
    {"index": 12,"type": 0,"description": "Click event"},
    {"index": 13,"type": 1,"description": "Visit new page event event"}
  ]



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
      console.log(this.Events[i])
    }

    
  }
  public  counter:number = -1;

  NavigateEvents(anchor: string): void{
    let top = 0 ;
    const interval = setInterval(() => {
      this.counter++;
     // console.log(this.counter);
      if (this.counter >= this.Events.length  ) {
        clearInterval(interval);
      }
      else{
        if( this.counter > 6){
          let theDiv: HTMLElement = document.getElementById("container")   as HTMLElement;  
          top++;
          theDiv.scrollTop = 60*top;
        }    
      }
     
    }, 1000);

  }
  
}
