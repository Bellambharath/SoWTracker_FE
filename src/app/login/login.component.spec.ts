import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../shared/Services/LoginService/login.service';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService:any,mockRouter:any,mockCommonService:any,mockResponse:any,mockuserData:any
  beforeEach(() => {
    mockLoginService=jasmine.createSpyObj('LoginService',['GetUserData','PutUserData','GetLoginData'])
    mockRouter=jasmine.createSpyObj('Router',['navigate'])
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers:[{provide:LoginService, useValue:mockLoginService},{provide:Router,useValue:mockRouter},{provide:CommonService,useValue:mockCommonService}],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
     mockResponse = 
    { 
      LoginName: "Admin", 
      EmailId: "admin@gmail.com" ,
      RoleName:"Admin",
      ScreenNames:"CandidateDetails,SOW,Domain,Technology,Mapping,SoList,CandidateList,Registration,ChangePassword",
      Status:"1",
      PermissionName:"Edit",
      FailureAttempts:0,
      Islock:false
    };
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onSubmit,FormInvalid',()=>
  {
   
    component.loginForm.setValue({loginName:"",loginPassword:""});
  
    component.onSubmit();
    expect(component.submitted).toBeTrue();
   
  })
  it('get f',()=>{

    expect(component.loginForm.controls).toEqual(component.f)

  })
  it('onSubmit,FormValid', () => 
  {
   
    component.loginForm.setValue({loginName:"admin@gmail.com",loginPassword:"Abc@123"});
    spyOn(component,'checkUserisValid');
    component.checkUserisValid();
    component.resultloader=false;
    component.onSubmit();
    expect(component.submitted).toBeTrue();
    expect(component.checkUserisValid).toHaveBeenCalled();
  })
  it('isFieldInvalid', () => {
    const fieldName = 'email'; // Replace with the actual field name
    const control = { invalid: true, touched: true };
    spyOn(component.loginForm , 'get').and.returnValue(control as AbstractControl);
    expect(component.isFieldInvalid(fieldName)).toBe(true);
  });
  
  it('checkUserisValid', fakeAsync(() => {
    component.resultloader = true;
    component.loginForm.patchValue({ loginName: 'admin@gmail.com', loginPassword: 'Abc@123' });
    mockLoginService.GetUserData.and.returnValue(of(mockResponse));
  
    component.checkUserisValid();
    expect(mockLoginService.GetUserData).toHaveBeenCalled();
    tick(1000); 
    expect(component.resultloader).toBeTrue();
    tick();
    expect(component.resultloader).toBeTrue();
    component.loaderTimeout.clearTimeout;
  }));
  
  it('checkUserisValid,LoginForTheFirstTime', fakeAsync(() => {
    component.resultloader = true;
    component.loginForm.patchValue({ loginName: 'admin@gmail.com', loginPassword: 'Sow@123' });
    mockLoginService.GetUserData.and.returnValue(of(mockResponse));
  
    component.checkUserisValid();
    expect(mockLoginService.GetUserData).toHaveBeenCalled();
    tick(1000); 
    expect(component.resultloader).toBeTrue();
    tick();
    expect(component.resultloader).toBeTrue();
    component.loaderTimeout.clearTimeout;
  }));

  it('checkUserisValid, HttpErrorResponse', fakeAsync(() => {
    component.loginForm.patchValue({ loginName: 'admin@gmail.com', loginPassword: 'A@123' });
    const errorMessage = 'Error message from server';
    mockLoginService.GetUserData.and.returnValue(throwError(new HttpErrorResponse({ status: 500, error: errorMessage })));
    
    component.checkUserisValid();
    expect(mockLoginService.GetUserData).toHaveBeenCalled();
    tick(1000); 
    expect(component.resultloader).toBeTrue();
    tick();
    expect(component.resultloader).toBeTrue();
    expect(component.errorMessage).toEqual('Username or Password is Incorrect');
    component.loaderTimeout.clearTimeout;
  }));
it('checkUserisValid,Invalid Credentials', async () => {

  component.resultloader = true;
  const res = {
    Status: 0,
    FailureAttempts: 2
  };
  component.userData = res;
  sessionStorage.setItem("userData", JSON.stringify(component.userData));
  component.loginForm.patchValue({ loginName: 'admin@gmail.com', loginPassword: 'Sow@123' });
    mockLoginService.GetUserData.and.returnValue(of(component.userData))
  await component.checkUserisValid();
  expect(component.errorMessage).toBe("Invalid Credentials. You are left with 1 more attempt"); 
});
it('checkUserisValid,Account is locked', async () => {

  component.resultloader = true;
  const res = {
    Status: 0,
    FailureAttempts: 6
  };
  component.userData = res;
  sessionStorage.setItem("userData", JSON.stringify(component.userData));
  component.loginForm.patchValue({ loginName: 'admin@gmail.com', loginPassword: 'Sow@123' });
    mockLoginService.GetUserData.and.returnValue(of(component.userData))
  await component.checkUserisValid();
  expect(component.errorMessage).toBe("Your Account is Locked."); 
});

  
});
