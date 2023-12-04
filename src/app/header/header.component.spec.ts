
import { ComponentFixture, TestBed } from '@angular/core/testing';

 

import { HeaderComponent } from './header.component';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../shared/Services/AuthService/auth.service';

import { AuthGuard } from '../auth/auth.guard';

 

describe('HeaderComponent', () => {

  let component: HeaderComponent;

  let fixture: ComponentFixture<HeaderComponent>;

   let mockRouter:any,mockauthservice:any,mockroute:any,mockauthguard:any,mocklocation:any,mockuserData:any,

   windowMock:any

  beforeEach(() => {

    windowMock = {

      location: {

      reload: jasmine.createSpy('reload')

      }

      }

    mockauthservice=jasmine.createSpyObj('AuthGuard',['loggedIn'])

    mockRouter=jasmine.createSpyObj('Router',['navigate'])

    TestBed.configureTestingModule({

      declarations: [HeaderComponent],

      imports:[MatMenuModule],

      providers:[{provide:Router,useValue:mockRouter},

      {provide:AuthService,useValue:mockauthservice},

    {provide:ActivatedRoute,useValue:mockroute},

  {provide:AuthGuard,useValue:mockauthguard},

{provide:Location,useValue:mocklocation}],

      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],

     

    })

    .compileComponents()

    let mockuserData = {

 

 

 

      "LoginName": "bharath",

 

      "EmailId": "bharath@gmail.com",

 

      "RoleName": "Admin",

 

      "ScreenNames": "CandidateDetails,SOW,Mapping,ChangePassword,Admin",

 

      "TabNames": "Candidate,SO,Account,DellManager,Domain,Location,Registration,Region,Recruiter,Technology,USTPOC,USTTPM", "Status": "1", "PermissionName": "Edit", "FailureAttempts": 0, "Islock": false, "IsFirstLogin": false

 

 

 

    }

    sessionStorage.setItem("userData", JSON.stringify(mockuserData));

    fixture = TestBed.createComponent(HeaderComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  })

 

 

  it('should create', () => {

    expect(component).toBeTruthy();

  });

 

  it('loggedIn',()=>{

   

   

    component.loggedIn()

  })

 

});

 