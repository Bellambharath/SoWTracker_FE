import { TestBed } from '@angular/core/testing';

 

import { AuthService } from './auth.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BehaviorSubject } from 'rxjs';

import { LoginService } from '../LoginService/login.service';

import { ActivatedRoute } from '@angular/router';

 

describe('AuthService', () => {

  let service: AuthService;

  let mockLoginService:any,mockActivatedRoute:any

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports:[HttpClientTestingModule],

      providers:[{ provide: LoginService, useValue: mockLoginService},

        {provide:ActivatedRoute,useValue:mockActivatedRoute}]

    });

   // mockLoginService=jasmine.createSpyObj('LoginService')

   

    mockActivatedRoute=jasmine.createSpyObj('ActivatedRoute',['queryParams'])

     mockActivatedRoute = {

 

      queryParams: new BehaviorSubject<any>({ firstLogin: 'true' }),

 

    };

    service = TestBed.inject(AuthService);

  });

 

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('loggedIn is true', () => {

    const userData = { username: 'Admin', Password: 'Sow@123' };

    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(userData));

    expect(service.loggedIn()).toBeTrue();

  });

 

  it('loggedIn is false', () => {

    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    expect(service.loggedIn()).toBeFalse();

  });

 

  it('ShowHeader',()=>{

    service.ShowHeader();

  })

 

  it('isfirstlogin',()=>{

    const userData = { username: 'Admin', Password: 'Sow@123' };

    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(userData));

    expect(service.IsFirstLogin()).toBeFalse();

   

  })

 

});

 