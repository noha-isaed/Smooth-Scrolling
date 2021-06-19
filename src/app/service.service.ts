import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  counterValue:number = 0 ;
  comment:String = "";
  flag:number = 0 ;

  getCounterValue():number{
    return  this.counterValue ;
  }

  gatDataFromTextArea():String {
    return this.comment;
  }
 
  getFlagValue():number{
    return this.flag;
  }

  setDataFromTextArea(data:string):void{
  this.comment =  data;
  }

  setCounterValue(counter:number) : void{
    this.counterValue =  counter ;
  }

  setFlagValue(flag:number):void{
    this.flag = flag ;
  }

}
