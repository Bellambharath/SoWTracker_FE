import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
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
  
  
});
