import { ComponentFixture, TestBed } from '@angular/core/testing';

 

import { SecurityComponent } from './security.component';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import { SecuirityService } from '../shared/Services/SecurityService/security.service';

import { of } from 'rxjs';

import { HttpClient, HttpClientModule } from '@angular/common/http';

 

describe('SecurityComponent', () => {

  let component: SecurityComponent;

  let fixture: ComponentFixture<SecurityComponent>;

  let mockSecurityService:any,mockroute:any,mocksecuritydata:any,mockhttpclient:any,mockuserdata:any

  beforeEach(() => {

    mockSecurityService=jasmine.createSpyObj('SecurityService',['getAllQuestions', 'postAnswer', 'getValidateSecurityQnA', 'UpdateQuestion', 'GetQuestionById', 'GetAnswerById', 'GetQuestionsByLoginId', 'StoreQuestionIds']);

    mockroute=jasmine.createSpyObj('Router',['navigate'])

    TestBed.configureTestingModule({

      declarations: [SecurityComponent],

      //imports:[HttpClientModule],

      providers: [

        { provide: SecuirityService, useValue: mockSecurityService },

       

        { provide: Router, useValue: mockroute },

        {provide:HttpClient,useValue:mockhttpclient}

      ],

      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]

    })

    .compileComponents();

    mocksecuritydata=[

      {

        "questionId": 8,

        "question": "Where did you go to high school/college?",

        "type": ""

      },

     

     

      {

        "questionId": 1,

        "question": "What city were you born in?",

        "type": ""

      }

    ]

    mockuserdata=[

      {

        "EmailId": "Sanjay@gmail.com",

        "FailureAttempts": 0,

        "Islock": false,

        "LoginName": "Sanjay",

        "PermissionName": "Edit",

        "RoleName": "Admin",

        "ScreenNames": "CandidateDetails,SOW,Domain,Technology,Mapping,SoList,CandidateList,Registration,ChangePassword,Admin",

        "Status": "1"

      }

     

    ]

   

    fixture = TestBed.createComponent(SecurityComponent);

    component = fixture.componentInstance;

 

    mockSecurityService.getAllQuestions.and.returnValue(of(mocksecuritydata))

    mockSecurityService.postAnswer.and.returnValue(of('success'))

    sessionStorage.setItem('userData',JSON.stringify(mockuserdata));

   

 

    mockSecurityService.GetAnswerById.and.returnValue(of("successful"))

    fixture.detectChanges();

  });

 

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('onSubmit should return null',()=>

  {

    component.securityForm.patchValue({

      selected1:'',

      ans1:'',

      selected2:'',

      ans2:'',

      selected3:'',

      ans3:'',

    })

    component.onSubmit();

  })

  it('onSubmit',()=>

  {

    component.securityForm.patchValue({

      selected1:1,

      ans1:'',

      selected2:2,

      ans2:'',

      selected3:3,

      ans3:'',

    })

    component.onSubmit();

  })

 

 

});