
import { ComponentFixture, TestBed } from '@angular/core/testing';

 

import { ChangePasswordComponent } from './change-password.component';

import { ChangePasswordService } from '../shared/Services/ChangePasswordService/change-password.service';

import { ActivatedRoute, Router } from '@angular/router';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BehaviorSubject, of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { useAnimation } from '@angular/animations';
import { AuthService } from '../shared/Services/AuthService/auth.service';

 

describe('ChangePasswordComponent', () => {

  let component: ChangePasswordComponent;

  let fixture: ComponentFixture<ChangePasswordComponent>;

  let mockChangePasswordService: any, mockRouter, mockActivatedRoute,mockMatSnackBar:any,mockauthservice:any

  beforeEach(() => {

    mockChangePasswordService = jasmine.createSpyObj('ChangePasswordService', ['UpdatePasswordData'])

    mockRouter = jasmine.createSpyObj('Router', ['navigate'])
    mockauthservice=jasmine.createSpyObj('AuthService',['loggedIn'])
    mockMatSnackBar=jasmine.createSpyObj('MatSnackBar',['open'])
    mockActivatedRoute = {

      queryParams: new BehaviorSubject<any>({ firstLogin: 'true', emailid: 'test@example.com' }),

    };

    TestBed.configureTestingModule({

      declarations: [ChangePasswordComponent],

      providers: [{ provide: ChangePasswordService, useValue: mockChangePasswordService },

      { provide: Router, useValue: mockRouter },

      { provide: ActivatedRoute, useValue: mockActivatedRoute },
      { provide: MatSnackBar, useValue: mockMatSnackBar},
      {provide:AuthService,useValue:mockauthservice}

      ],

      schemas: [NO_ERRORS_SCHEMA]
    })

      .compileComponents();

    let mockuserData = {
      "EmailId": "admin@gmail.com",
      "oldPassword": "Sow@123",
      "newPassword": "Abc@123",
      "type": "update"
    }

    sessionStorage.setItem('author', JSON.stringify(mockuserData))
    sessionStorage.setItem('userData', JSON.stringify(mockuserData))

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('get f', () => {

    expect(component.passwordForm.controls).toEqual(component.f)

  })

  

  it('onSubmit', () => {

    component.passwordForm.patchValue(

      {
        oldPw: "Sow@123",
        newPw: "Abc@123",
        confirmPw: "Abc@123",
        emailId: 'admin@gmail.com'
      })
      component.f;
      let data={ count1: 1, count2: 0 }
      mockChangePasswordService.UpdatePasswordData.and.returnValue(of(data))
    component.onSubmit();

  })

  it('onSubmitNotMatch', () => {

    component.passwordForm.patchValue(

      {
        oldPw: "Sow@123",
        newPw: "Abc@123",
        confirmPw: "Ab@123",
        emailId: 'admin@gmail.com'
      })

      component.f;
      let data={ count1: 1, count2: 0 }
    mockChangePasswordService.UpdatePasswordData.and.returnValue(of(data))
    component.onSubmit();
  })

  it('onSubmitNotMatch', () => {

    component.passwordForm.patchValue(

      {

        oldPw: "Sow@123",
        newPw: "Sow@123",
        confirmPw: "Sow@123",
        emailId: 'admin@gmail.com'
      })
      component.f;
      let data={ count1: 1, count2: 0 }
    mockChangePasswordService.UpdatePasswordData.and.returnValue(of(data))
    component.onSubmit();
  })


  it('OnSubmitForForgot', () => {

    component.passwordForm.patchValue(

      {
        oldPw: "Sow@123",
        newPw: "Abc@123",
        confirmPw: "Abc@123",
        emailId: 'admin@gmail.com'

      })

      component.f;

   component.useremail="Sow@123"

    let data={ count1: 1, count2: 0 }

    mockChangePasswordService.UpdatePasswordData.and.returnValue(of(data))
    component.OnSubmitForForgot();
  })

  it('OnSubmitForForgotNotMatch', () => {

    component.passwordForm.patchValue(

      {
        oldPw: "Sow@123",
        newPw: "Abc@123",
        confirmPw: "Ab@123",
        emailId: 'admin@gmail.com'

      })

      component.f;

   component.useremail="Sow@123"

    let data={ count1: 1, count2: 0 }

    mockChangePasswordService.UpdatePasswordData.and.returnValue(of(data))
    component.OnSubmitForForgot();
  })

    it('OnSubmitForForgotError', () => {
      mockChangePasswordService.UpdatePasswordData.and.returnValue(throwError(() => {
        new Error("Error")     
      }))
      component.OnSubmitForForgot();
    })

 
  it('getEmailId', () => {

    component.getEmailId();

  })

});