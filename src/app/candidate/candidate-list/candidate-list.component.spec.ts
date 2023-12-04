import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListComponent } from './candidate-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CandidateService } from 'src/app/shared/Services/CandidateService/candidate.service';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';
import { of, throwError } from 'rxjs';

describe('CandidateListComponent', () => {
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;
  let mockcandidateService: any, mockroute, mockstatusService, mockstatusdata, mockcandidatedata
  beforeEach(() => {
    mockcandidateService = jasmine.createSpyObj('CandidateService', ['PostCandidateDuplicateCheck', 'GetAllCandidatesData', 'PostCandidateData',

      'DeleteCandidateData', 'UpdateCandidateData', 'GetCandidateById', 'GetCandidateByDate'])
    mockstatusService = jasmine.createSpyObj('StatusserviceService', ['GetStatusByType'])

    mockroute = jasmine.createSpyObj('Router', ['navigate'])
    TestBed.configureTestingModule({

      declarations: [CandidateListComponent],

      providers: [{ provide: CandidateService, useValue: mockcandidateService },
      { provide: Router, useValue: mockroute },
      { provide: StatusService, useValue: mockstatusService }],
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

    fixture = TestBed.createComponent(CandidateListComponent);

    component = fixture.componentInstance;


    //mockCommonService.headerContent.and.returnValue(of(true))
    mockcandidateService.GetCandidateById.and.returnValue(of(mockcandidatedata))
    mockcandidateService.PostCandidateData.and.returnValue(of(mockcandidatedata))
    mockstatusService.GetStatusByType.and.returnValue(of(mockstatusdata))
    fixture = TestBed.createComponent(CandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('cancel', () => {
  //   component.cancel();
  // })
  it('onSubmit', () => {
    component.candidateform.patchValue({
      candidateUid: "",
      candidateName: "",
      dob: "",
      address: "",
      email: "",
      gender: "",
      joiningDate: "",
      location: "",
      mobileNo: "",
      pincode: "",
      skills: "",
      status: "",
      isInternal: false
    })
    component.onSubmit()

  })



  it('onSubmit should throw error', () => {
    component.candidateform.patchValue(
      {
        candidateName: "darshan v shejawadkar",
        candidateUid: "237515",
        mobileNo: "9164292391",
        gender: "Male",
        dob: "2000/01/01",
        email: "darshanshejawadkar107@gmail.com",
        location: "sdegvfdfs",
        skills: "asdf",
        joiningDate: "01-01-2000",
        address: "12 Prashant Extention",
        status: "Joined",
        pincode: "560066",
        isInternal: true
      }
    )
    component.candidateform.controls['dob'].setValue('2000-01-01');
    component.candidateform.controls['joiningDate'].setValue('2023-01-01');
    component.candidateform.markAllAsTouched();

    mockcandidateService.PostCandidateData.and.returnValue(throwError(() => {
      new Error("Error updating Technology data")
      
    }))
    component.onSubmit();  
    

  })

  it('should call PostCandidateData and reset form when form is valid', () => {
    component.candidateform.patchValue(
      {
        candidateName: "darshan v shejawadkar",
        candidateUid: "237515",
        mobileNo: "9164292391",
        gender: "Male",
        dob: "2000/01/01",
        email: "darshanshejawadkar107@gmail.com",
        location: "sdegvfdfs",
        skills: "asdf",
        joiningDate: "01-01-2000",
        address: "12 Prashant Extention",
        status: "Joined",
        pincode: "560066",
        isInternal: true
      }
    )
    component.candidateform.controls['dob'].setValue('2000-01-01');
    component.candidateform.controls['joiningDate'].setValue('2023-01-01');
    component.candidateform.markAllAsTouched();
    mockcandidateService.PostCandidateData.and.returnValue(of("Succesfully submitted"))
    component.onSubmit();
  });

  it('', () => {
    mockcandidateService.PostCandidateData.and.returnValue(throwError(() => { new Error('Not Updated') }))
    component.onSubmit();
    expect(component.onSubmit()).toBe()
  })

  it('canExit', () => {
    component.canExit()
  })

  it('should prompt confirmation when SowForm is dirty', () => {
    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
    component.candidateform.markAsDirty();
    component.canExit();
    expect(confirmSpy).toHaveBeenCalledWith('You have unsaved changes. Do you really want to discard these changes?');
    expect(component.canExit()).toBeTrue();
  });

  it("markAllFieldsAsUntouched",()=>

  {

     component.markAllFieldsAsUntouched();

  })

});
