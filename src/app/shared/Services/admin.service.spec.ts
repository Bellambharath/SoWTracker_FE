import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports:[HttpClientTestingModule],
      providers:[AdminService]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllAccountData', () => {
    const obj = [{  accountId: 1,
    accountName: "DL-IN",
    type: ""}, { 
      accountId: 2,
      accountName: "DL-US",
      type: ""
     }];

    service.GetAllAccountData().subscribe((data) => {
      expect(data).toEqual(obj);
    });
    
    
  });

  it('PostAccountData', () => {
    const obj = {  accountId: 1,
      accountName: "DL-IN",
      type: ""};

    service.PostAccountData(obj).subscribe((response) => {
      expect(response).toEqual(obj);
    });
    

  });
  it('DeleteAccountData',()=>{
    const obj={accountId: 1,
      accountName: "DL-IN",
      type: ""}
      service.DeleteAccountData(obj.accountId).subscribe((x)=>[
        expect(x).toEqual(obj)
      ])
     
  })
  it('UpdateAccountData',()=>{
    const obj={accountId: 1,
      accountName: "DL-IN",
      type: ""}
      service.UpdateAccountData(obj.accountId,obj).subscribe((x)=>[
        expect(x).toEqual(obj)
      ])
     
  })
  it('GetAccountById',()=>{
    const obj={accountId: 1,
      accountName: "DL-IN",
      type: ""}
      service.GetAccountById(obj.accountId).subscribe((x)=>[
        expect(x).toEqual(obj)
      ])
      
      
  })
  it('PostSOWDuplicateCheck',()=>{
    const obj={accountId: 1,
      accountName: "DL-IN",
      type: ""}
      service.PostSOWDuplicateCheck(obj).subscribe((x)=>[
        expect(x).toEqual(obj)
      ])
      
      
  })
  
});
