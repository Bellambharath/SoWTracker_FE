import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[LoginService]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetUserData',()=>{
    const data=
    [
      {
        loginName: "Admin",
        loginPassword: "",
        loginId: 1,
        emailId: "admin@gmail.com",
        roleId: 1,
        roleName: "Admin",
        type: "",
        failureAttempts: 0,
        isLock: false
      }
    ]
    const httpParams = new HttpParams().set('param1', 'value1').set('param2', 'value2');
      service.GetUserData(httpParams).subscribe((r)=>{
        expect(r).toBe(data)
      })
  })
  // it('PutUserData',()=>{
  //   const data=
    
  //     {
  //       loginName: "Admin",
  //       loginPassword: "",
  //       loginId: 1,
  //       emailId: "admin@gmail.com",
  //       roleId: 1,
  //       roleName: "Admin",
  //       type: "",
  //       failureAttempts: 0,
  //       isLock: false
  //     }
    
  //     // service.PutUserData(data.loginName,).subscribe((r)=>{
  //     //   expect(r).toBe(data)
  //     // })
  // })
  it('GetLoginData',()=>{
    const data=
    {
      loginName: "Admin",
      loginPassword: "",
      loginId: 1,
      emailId: "admin@gmail.com",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false
    }
      service.GetLoginData().subscribe((r)=>{
        expect(r).toBe()
      })
  })
  
});
