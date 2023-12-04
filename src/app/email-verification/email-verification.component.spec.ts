import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { EmailVerificationComponent } from './email-verification.component';

import { of, throwError } from 'rxjs';

import { SecuirityService } from '../shared/Services/SecurityService/security.service';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'

 

describe('EmailVerificationComponent', () => {

  let component: EmailVerificationComponent;

  let fixture: ComponentFixture<EmailVerificationComponent>;

  let mockSecurityService: any, mockRouter: any, mockSnackBar: any;

 

  beforeEach(async () => {

    mockSecurityService = jasmine.createSpyObj('SecurityService', ['getAllQuestions', 'postAnswer', 'getValidateSecurityQnA', 'UpdateQuestion', 'GetQuestionById', 'GetAnswerById', 'GetQuestionsByLoginId', 'StoreQuestionIds']);

    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

 

    await TestBed.configureTestingModule({

      declarations: [EmailVerificationComponent],

     

      providers: [

        { provide: SecuirityService, useValue: mockSecurityService },

        { provide: MatSnackBar, useValue: mockSnackBar },

        { provide: Router, useValue: mockRouter }

      ],

      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]

    })

    .compileComponents();

 

    fixture = TestBed.createComponent(EmailVerificationComponent);

    component = fixture.componentInstance;

   mockSecurityService.GetQuestionsByLoginId.and.returnValue(of("nandhini@gmail.com"))

    fixture.detectChanges();

  });

 

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('submitForm', () => {

    let data={

      "answer1": "",

      "answer2": "",

      "answer3": "",

      "answerId": 0,

      "emailId": "",

      "questionId1": 12,

      "questionId2": 11,

      "questionId3": 10,

      "type": ""

    }

    mockSecurityService.GetQuestionsByLoginId.and.returnValue(of(data));

    component.submitForm("test@gmail.com");

   

  })

 

  it('submitForm', () => {

    let data={

      "answer1": "",

      "answer2": "",

      "answer3": "",

      "answerId": 0,

      "emailId": "",

      "questionId1": 12,

      "questionId2": 11,

      "questionId3": 10,

      "type": ""

    }

    mockSecurityService.GetQuestionsByLoginId.and.returnValue(throwError(()=>

    {

      new Error('error')

 

    }));

    

    component.submitForm("test@gmail.com");

   

  })

 

});

 