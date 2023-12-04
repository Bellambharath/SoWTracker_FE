import { TestBed } from '@angular/core/testing';

import { ChangePasswordService } from './change-password.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
describe('ChangePasswordService', () => {
  let service: ChangePasswordService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule],
      providers:[ChangePasswordService]});
    service = TestBed.inject(ChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('UpdatePasswordData,count1=1', () => {
    const obj = {}; 

    const response ='"New Password updated successfully"';
    spyOn(service['http'], 'put').and.returnValue(of(response));

    service.UpdatePasswordData(obj).subscribe((result) => {
      expect(result.count1).toBe(0);
     
    });
  });
  it('UpdatePasswordData,Count2=2',()=>{
    const obj={}
    const response='"Old Password does not match"'
    spyOn(service['http'],'put').and.returnValue(of(response))
    service.UpdatePasswordData(obj).subscribe((r)=>{
     expect(r.count2).toBe(2)

    })
  })
  it('UpdatePasswordData,error',()=>{
    const obj={}
    spyOn(service['http'],'put').and.returnValue(throwError('Error Message'))
    service.UpdatePasswordData(obj).subscribe({
      error:(error)=>{
        expect(error).toBe('An error occurred while updating the password. Please try again later.')
      }
    })
  })
  it('UpdatePasswordData,router',()=>{
    const obj={}
    spyOn(service['http'],'put').and.returnValue(throwError({status:0}))
    const router=spyOn(service['router'],'navigate')
    service.UpdatePasswordData(obj).subscribe({
      error:(error)=>{
        expect( router).toHaveBeenCalledWith(['/server-down'])
      }
    })
  })
});
