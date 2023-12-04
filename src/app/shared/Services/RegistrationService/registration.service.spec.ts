import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[RegistrationService]
    });
    service = TestBed.inject(RegistrationService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetRoleData',()=>{
    const data=
    [
      {
        loginName: "",
        loginPassword: "",
        loginId: 0,
        emailId: "",
        roleId: 1,
        roleName: "Admin",
        type: "",
        failureAttempts: 0,
        isLock: false
      }
    ]
      service.GetRoleData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('GET')
  })
  it('PostRegistrationData',()=>{
    const data=
    {
      loginName: "",
      loginPassword: "",
      loginId: 0,
      emailId: "",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false
    }
      service.PostRegistrationData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('POST')
      req.flush(data)
  })
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
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.loginUrl}`)
      expect(req.request.method).toBe('GET')
  })
  it('UpdateLoginData',()=>{
    const data=
    {
      loginName: "",
      loginPassword: "",
      loginId: 0,
      emailId: "",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false
    }
      service.UpdateLoginData(data.loginId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=0
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('PUT')
      req.flush(data)
  })
  it('DeleteLoginData',()=>{
    const data=
    {
      loginName: "",
      loginPassword: "",
      loginId: 0,
      emailId: "",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false
    }
      service.DeleteLoginData(data.loginId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=0
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
  })
  it('UpdateIsLock',()=>{
    const data=
    {
      loginName: "",
      loginPassword: "",
      loginId: 0,
      emailId: "",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false
    }
      service.UpdateIsLock(data.loginId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
     
  })
});
