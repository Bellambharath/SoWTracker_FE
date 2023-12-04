import { Injectable } from '@angular/core';
import { LoginService } from '../LoginService/login.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firstLogin: boolean;
  showheader: boolean=false;
  constructor(service:LoginService,private route: ActivatedRoute) { }
  
  loggedIn(){
    let data=sessionStorage.getItem('userData');
    let userInfo=(data)?JSON.parse(data):null;
    
    if(userInfo!=null){
      return true;
    }
    else
    {
      return false;
    }

  }
  IsFirstLogin()
  {
    let data=sessionStorage.getItem('userData');
    let userInfo=(data)?JSON.parse(data):null;
    
    let isfirstlogin=userInfo.IsFirstLogin?true:false;
    return isfirstlogin;

  }



  ShowHeader() 
  {
    this.route.queryParams.subscribe(params => {
      this.firstLogin = params['firstLogin'] === 'true' ? true : false;

    });
    
    if(this.firstLogin==true)
    {
     
      return false;
    }
    else if(this.loggedIn())
    {
      return true;
    }
    else{
      return false;
    }
  }

}
