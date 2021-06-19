import { ServiceService } from '../service.service';
import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  name: string = '';
  flag = 0 ;
 
  constructor(private service : ServiceService) {  }

  ngOnInit(): void {

  }


  displayCommentArea(): void{

    let counetrValue =  this.service.getCounterValue();
  
    let timer: HTMLElement = document.getElementById("timer")   as HTMLElement; 
    timer.innerHTML = String(counetrValue);

    let theDiv: HTMLElement = document.getElementById("comment")   as HTMLElement;  
    theDiv.style.display = "block";
  }

  onSubmit(f: NgForm) {

    this.flag++;
    this.service.setDataFromTextArea(f.value.teatArea) ;
    this.service.setFlagValue(this.flag);
  }


}
