import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
value:boolean=false;
  private loadHeader = new BehaviorSubject(false);
  loadMessage = this.loadHeader.asObservable();

  private loadHeaderContent = new BehaviorSubject(false);
  HeaderContent = this.loadHeaderContent.asObservable();

  private loadIsFromLogin = new BehaviorSubject(false);
  IsFromLogin = this.loadIsFromLogin.asObservable();

  constructor() { }

  loadComponent(message: any) {
    this.loadHeader.next(message);
  }

  headerContent(content: any) 
  {
    this.loadHeaderContent.next(content);
  }
  FromLogin(msg:boolean)
  {
    this.loadIsFromLogin.next(msg);
    // console.log("hi",this.IsFromLogin);
  }
  GetIsFromLogin()
  {
    this.value=this.IsFromLogin?true:false;
    this.loadIsFromLogin.next(false);
    console.log("in service",this.IsFromLogin)
    return this.value;
  }
}
