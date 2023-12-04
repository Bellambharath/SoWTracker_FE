import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailsComponent } from './candidate-details.component';
import { CandidateService } from 'src/app/shared/Services/CandidateService/candidate.service';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';
import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('CandidateDetailsComponent', () => {
  let component: CandidateDetailsComponent;
  let fixture: ComponentFixture<CandidateDetailsComponent>;
  let mockcandidateService: any, mockroute, mockstatusService, mockexcelService,
    mockstatusdata, mockcandidatedata: any, mockexceldata:any,mockuserData:any


  beforeEach(() => {
    mockcandidateService = jasmine.createSpyObj('CandidateService', ['PostCandidateDuplicateCheck', 'GetAllCandidatesData', 'PostCandidateData', 'DeleteCandidateData', 'UpdateCandidateData',
      'GetCandidateById', 'GetCandidateByDate'])
    mockroute = jasmine.createSpyObj('Router', ['navigate', 'queryParams'])
    mockstatusService = jasmine.createSpyObj('StatusserviceService', ['GetStatusByType'])
    mockexcelService = jasmine.createSpyObj('ExcelService', ['jsonExportAsExcel'])
    TestBed.configureTestingModule({
      declarations: [CandidateDetailsComponent],

      providers: [{ provide: CandidateService, useValue: mockcandidateService },
      { provide: Router, useValue: mockroute },
      { provide: StatusService, useValue: mockstatusService },
      { provide: ExcelService, useValue: mockexcelService },
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
    mockstatusdata = mockstatusdata = [
      {
        "statusId": 4,
        "statusName": "Joined",
        "type": "",
        "statusType": ""
      },
      {
        "statusId": 5,
        "statusName": "Cancelled",
        "type": "",
        "statusType": ""
      },
      {
        "statusId": 6,
        "statusName": "Rejected",
        "type": "",
        "statusType": ""
      },
      {
        "statusId": 8,
        "statusName": "Offered",
        "type": "",
        "statusType": ""
      }
    ]

    mockcandidatedata = [
      {
        "candidateId": 2036,
        "candidateName": "paida p sahith",
        "candidateUid": "237519",
        "mobileNo": "8522019567",
        "gender": "female",
        "dob": "2023-04-15T00:00:00",
        "email": "paidasahith44@gmail.com",
        "location": "Hyderabad",
        "skills": "c#",
        "joiningDate": "2023-04-22T00:00:00",
        "address": "1-14,neeliagudem,thripuraram,nalgonda",
        "status": "Cancelled",
        "pincode": "500084",
        "isInternal": true
      },
      {
        "candidateId": 2034,
        "candidateName": "kandukuri prathyusha Reddy",
        "candidateUid": "237518",
        "mobileNo": "8522019567",
        "gender": "female",
        "dob": "2023-04-15T00:00:00",
        "email": "prathyushareddy2204@gmail.com",
        "location": "Hyderabad",
        "skills": "c#",
        "joiningDate": "2023-04-21T00:00:00",
        "address": "1-14,neeliagudem,thripuraram,nalgonda",
        "status": "Cancelled",
        "pincode": "500084",
        "isInternal": true
      },
      {
        "candidateId": 2026,
        "candidateName": "Kandukuri prathyusha",
        "candidateUid": "238023",
        "mobileNo": "8765344567",
        "gender": "Female",
        "dob": "2000-04-22T00:00:00",
        "email": "sadfgnd@asdv.com",
        "location": "Bengaluru",
        "skills": "Angular, .Net, Selenium, Jasmine.",
        "joiningDate": "2022-09-06T00:00:00",
        "address": "Bengaluru",
        "status": "Offered",
        "pincode": "875456",
        "isInternal": true
      },
      {
        "candidateId": 2023,
        "candidateName": "dvs",
        "candidateUid": "1234",
        "mobileNo": "9164292391",
        "gender": "Male",
        "dob": "2023-06-07T00:00:00",
        "email": "Darshan.Vinayakshejawadkar@Ust.Com",
        "location": "asd",
        "skills": "asd",
        "joiningDate": "2023-04-07T00:00:00",
        "address": "asdfvs",
        "status": "Cancelled",
        "pincode": "583217",
        "isInternal": false
      },
      {
        "candidateId": 2022,
        "candidateName": "darshan v shejawadkar",
        "candidateUid": "237515",
        "mobileNo": "9164292391",
        "gender": "Male",
        "dob": "2023-06-01T00:00:00",
        "email": "darshanshejawadkar107@gmail.com",
        "location": "sdegvfdfs",
        "skills": "asdf",
        "joiningDate": "2024-06-12T00:00:00",
        "address": "12 Prashant Extention",
        "status": "Joined",
        "pincode": "560066",
        "isInternal": true
      }]
      let mockuserData = {

        "LoginName": "bharath", 
        "EmailId": "bharath@gmail.com", 
        "RoleName": "Admin", 
        "ScreenNames": "CandidateDetails,SOW,Mapping,ChangePassword,Admin", 
        "TabNames": "Candidate,SO,Account,DellManager,Domain,Location,Registration,Region,Recruiter,Technology,USTPOC,USTTPM", "Status": "1", "PermissionName": "Edit", "FailureAttempts": 0, "Islock": false, "IsFirstLogin": false
  
      }
  
      sessionStorage.setItem('userData', JSON.stringify(mockuserData))
    mockexceldata = [{ "domainId": 12, "domainName": "EBI/DWH" }, { "domainId": 11, "domainName": "App Dev" }, { "domainId": 10, "domainName": "DB" }, { "domainId": 9, "domainName": "Support" }, { "domainId": 8, "domainName": "R&D" }]

    mockcandidateService.GetAllCandidatesData.and.returnValue(of(mockcandidatedata))
    mockcandidateService.PostCandidateDuplicateCheck.and.returnValue(of(mockcandidatedata))
    mockcandidateService.DeleteCandidateData.and.returnValue(of(mockcandidatedata))
    mockcandidateService.UpdateCandidateData.and.returnValue(of(mockcandidatedata))
    mockstatusService.GetStatusByType.and.returnValue(of(mockstatusdata))
    mockexcelService.jsonExportAsExcel.and.returnValue(of(mockexceldata))
    fixture = TestBed.createComponent(CandidateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('GetCandidateData', () => {

    mockcandidateService.GetAllCandidatesData.and.returnValue(throwError(() => {
      new Error("no candidate data")
      component.GetCandidateData()
    }))

  })


  it('DeleteDetails', () => {

    const obj = {
      candidateId: 7,
      candidateUid: "345445",
      candidateName: "bharath",
      mobileNo: "8522019567",
      gender: "female",
      dob: "2023-04-15T00:00:00",
      email: "bharath@ust.com",
      location: "Hyderabad",
      skills: "c#",
      joiningDate: "2023-04-21T00:00:00",
      address: "1-14,neeliagudem,thripuraram,nalgonda",
      status: "Cancelled",
      pincode: "500084",
      isInternal: true
    }
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteDetails(obj.candidateId);
  })

  it('UPDATEDetails', () => {

    const obj = {
      candidateId: 7,
      candidateUid: "345445",
      candidateName: "bharath",
      mobileNo: "8522019567",
      gender: "female",
      dob: "2023-04-15T00:00:00",
      email: "bharath@ust.com",
      location: "Hyderabad",
      skills: "c#",
      joiningDate: "2023-04-21T00:00:00",
      address: "1-14,neeliagudem,thripuraram,nalgonda",
      status: "Cancelled",
      pincode: "500084",
      isInternal: true
    }
    component.UpdateCandidateData(obj);
  })

  it('', () => {
    const obj = {
      candidateId: 7,
      candidateUid: "345445",
      candidateName: "bharath",
      mobileNo: "8522019567",
      gender: "female",
      dob: "2023-04-15T00:00:00",
      email: "bharath@ust.com",
      location: "Hyderabad",
      skills: "c#",
      joiningDate: "2023-04-21T00:00:00",
      address: "1-14,neeliagudem,thripuraram,nalgonda",
      status: "Cancelled",
      pincode: "500084",
      isInternal: true
    }
    mockcandidateService.UpdateCandidateData.and.returnValue(throwError(() => { new Error('Not Updated') }))

    component.UpdateCandidateData(obj);

    expect(component.UpdateCandidateData(obj)).toBe()

  })

  it('resetfilter', () => {
    component.restCustomFilter()
  });

  it('selectrow', () => {
    const obj = {
      candidateId: 7,
      candidateUid: "345445",
      candidateName: "bharath",
      mobileNo: "8522019567",
      gender: "female",
      dob: "2023-04-15T00:00:00",
      email: "bharath@ust.com",
      location: "Hyderabad",
      skills: "c#",
      joiningDate: "2023-04-21T00:00:00",
      address: "1-14,neeliagudem,thripuraram,nalgonda",
      status: "Cancelled",
      pincode: "500084",
      isInternal: true
    }
    component.selectRow(obj)
  });

  it('cancelrow', () => {
    const obj = {
      candidateId: 7,
      candidateUid: "345445",
      candidateName: "bharath",
      mobileNo: "8522019567",
      gender: "female",
      dob: "2023-04-15T00:00:00",
      email: "bharath@ust.com",
      location: "Hyderabad",
      skills: "c#",
      joiningDate: "2023-04-21T00:00:00",
      address: "1-14,neeliagudem,thripuraram,nalgonda",
      status: "Cancelled",
      pincode: "500084",
      isInternal: true
    }
    component.cancelUpdate(obj)
  });

  

  it('download', () => {

    component.DownloadExcel()

  })
  it('addfile', () => {
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
    component.onFileSelected(event);
    expect(component.file).toEqual(file);
  });

  it('addfile', () => {
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
    mockcandidateService.PostCandidateDuplicateCheck.and.returnValue(of(mockcandidatedata))
    mockcandidateService.GetAllCandidatesData.and.returnValue(of(mockcandidatedata))
    component.onFileSelected(event)
  })

  it('addfile', () => {
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
    mockcandidateService.PostCandidateDuplicateCheck.and.returnValue(of(mockcandidatedata))
    mockcandidateService.GetAllCandidatesData.and.returnValue(throwError(() => {
      new Error("no file")
    }))
    component.onFileSelected(event)
  })
  it('resetfilter', () => {
    component.clearFormField("uid")
  });

  it('FormatDate', () => {
    component.formatdate("2020/02/01")
  });


});
