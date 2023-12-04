import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoListComponent } from './so-list.component';
import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SoService } from 'src/app/shared/Services/SoService/so.service';
import { RegionService } from 'src/app/shared/Services/RegionService/region.service';
import { LocationService } from 'src/app/shared/Services/LocationService/location.service';
import { AccountService } from 'src/app/shared/Services/AccountService/account.service';
import { UstTpmService } from 'src/app/shared/Services/UsttpmService/ust-tpm.service';
import { UstPocService } from 'src/app/shared/Services/UstpocService/ust-poc.service';
import { RecruiterService } from 'src/app/shared/Services/RecruiterService/recruiter.service';
import { DellManagerService } from 'src/app/shared/Services/DellManagerService/dell-manager.service';
import { TechnologyService } from 'src/app/shared/Services/TechnologyService/technology.service';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';
import { CandidateMappingService } from 'src/app/shared/Services/CandidateMappingService/candidate-mapping.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { AbstractControl } from '@angular/forms';

describe('SoListComponent', () => {
  let component: SoListComponent;
  let fixture: ComponentFixture<SoListComponent>;
  let mockexcelService:any,mockroute,mockservice:any,mockregionService:any,
  mocklocationService:any,mockaccountService:any,mocktpmService:any,mockpocService:any,
  mockrecruiterService:any,mockdellManagerService:any,mocktechService:any,
  mockstatusService:any,mockmappingService:any,mockservicedata:any,mockrouter:any
  beforeEach
  (() => {
    mockexcelService=jasmine.createSpyObj('ExcelService',['jsonExportAsExcel'])
    mockroute=jasmine.createSpyObj('Router',['navigate'])
    mockservice=jasmine.createSpyObj('SoService',['GetAllSowData','PostSOWDuplicateCheck','UpdateSowData','DeleteSowData','PostSowData'])
    mockregionService=jasmine.createSpyObj('RegionService',['GetAllRegionData'])
    mocklocationService=jasmine.createSpyObj('LocationService',['GetLocationByRegionId','GetAllLocationData'])
    mockaccountService=jasmine.createSpyObj('AccountService',['GetAllAccountData'])
    mocktpmService=jasmine.createSpyObj('UstTpmService',['GetAllUSTTPMData'])
    mockpocService=jasmine.createSpyObj('UstPocService',['GetAllUstPocData'])
    mockrecruiterService=jasmine.createSpyObj('RecruiterService',['GetAllRecruiterData'])
    mockdellManagerService=jasmine.createSpyObj('DellManagerService',['GetAllDellManagerData']);
    mocktechService=jasmine.createSpyObj('TechnologyService',['GetAllTechData'])
    mockstatusService = jasmine.createSpyObj('StatusService',['GetAllStatusData','GetStatusByType'])
    mockmappingService= jasmine.createSpyObj('CandidateMappingService',['GetAllCandidateMappingData'])
    TestBed.configureTestingModule({
      declarations: [SoListComponent],
      providers:[{provide:ExcelService,useValue:mockexcelService},
      {provide:Router,useValue:mockroute},
    {provide:SoService,useValue:mockservice},{provide:RegionService,useValue:mockregionService},
    {provide:LocationService,useValue:mocklocationService},
      {provide:AccountService,useValue:mockaccountService},
    {provide:UstTpmService,useValue:mocktpmService},{provide:UstPocService,useValue:mockpocService},
    {provide:RecruiterService,useValue:mockrecruiterService},
    {provide:DellManagerService,useValue:mockdellManagerService},{provide:TechnologyService,useValue:mocktechService},
    {provide:StatusService,useValue:mockstatusService},
      {provide:CandidateMappingService,useValue:mockmappingService},
    {provide:ActivatedRoute,useValue:mockrouter}],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockservicedata=[
      {
        "sowId": 33,
        "soName": "SADFG",
        "jrCode": "234",
        "requestCreationDate": "2023-06-15T00:00:00",
        "accountId": 2,
        "technologyId": 184,
        "role": "Developer",
        "locationId": 5,
        "regionId": 1,
        "targetOpenPositions": 3,
        "positionsTobeClosed": 3,
        "ustpocId": 7,
        "recruiterId": 1,
        "usttpmId": 27,
        "dellManagerId": 38,
        "statusId": 3,
        "band": "SDFG",
        "projectId": "234WESD",
        "accountManager": "Darshan",
        "externalResource": "Darshan",
        "internalResource": "Darshan",
        "type": "",
        "technologyName": "UX - Product Designer",
        "accountName": "DL-US",
        "location": "BNG",
        "region": "IN",
        "ustpocName": "Chitralekha M / Practice",
        "recruiterName": "Abhishek P",
        "usttpmName": "Vasu K",
        "dellManagerName": "Bhadri Ravikanth",
        "statusName": "Closed"
      }]
    fixture = TestBed.createComponent(SoListComponent);
    component = fixture.componentInstance;
    mockservice.GetAllSowData.and.returnValue(of(mockservicedata));
    mockservice.PostSOWDuplicateCheck.and.returnValue(of(mockservicedata));
    mockservice.UpdateSowData.and.returnValue(of(mockservicedata));
    mockservice.DeleteSowData.and.returnValue(of(mockservicedata));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get f',()=>{
    expect(component.SowForm.controls).toEqual(component.f)
  })
  it('onRegionSelected',()=>{
    const id =1 
    spyOn(component,'GetDropdown9');
    component.onRegionSelected("1");

  })
  it('GetDropdown1',()=>{
    const obj= {
      "accountId": 1,
      "accountName": "DL-IN",
      "type": ""
    }
    mockaccountService.GetAllAccountData.and.returnValue(of(obj))
    component.GetDropdown1()
    expect(component.GetDropdown1()).toBeTruthy()
  })
  it('GetDropdown2',()=>{
    const obj= {
      "technologyId": 188,
          "technologyName": "XSLT and XSLFO ",
          "domainId": 6,
          "type": "",
          "domainName": "Others"
    }
    mocktechService.GetAllTechData.and.returnValue(of(obj))
    component.GetDropdown2()
    expect(component.GetDropdown2()).toBeTruthy()
  })
  it('GetDropdown9',()=>{
    const obj=  {
      "locationId": 5,
      "location": "BNG",
      "regionId": 1,
      "type": ""
    }
    mocklocationService.GetLocationByRegionId.and.returnValue(of(obj))
    component.GetDropdown9(5)
    expect(component.GetDropdown9(5)).toBeTruthy()
  })
  it('GetDropdown3',()=>{
    const obj= {
      "recruiterId": 31,
            "recruiterName": "Varnitha",
            "type": ""
    }
    mockrecruiterService.GetAllRecruiterData.and.returnValue(of(obj))
    component.GetDropdown3()
    expect(component.GetDropdown3()).toBeTruthy()
  })
  it('GetDropdown4',()=>{
    const obj= {
      "ustpocId": 38,
      "ustpocName": "Sirisha/Hema",
      "type": ""
    }
    mockpocService.GetAllUstPocData.and.returnValue(of(obj))
    component.GetDropdown4()
    expect(component.GetDropdown4()).toBeTruthy()
  })
  it('GetDropdown5',()=>{
    const obj= {
      "dellManagerId": 586,
      "dellManagerName": "Viswa",
      "type": ""
    }
    mockdellManagerService.GetAllDellManagerData.and.returnValue(of(obj))
    component.GetDropdown5()
    expect(component.GetDropdown5()).toBeTruthy()
  })
  it('getStatus',()=>{
    const obj= {
      "statusId": 2,
      "statusName": "Declined",
      "type": "",
      "statusType": "SO"
    }
    mockstatusService.GetAllStatusData.and.returnValue(of(obj))
    component.getStatus()
    expect(component.getStatus()).toBeTruthy()
  })
  it('GetStatusByType',()=>{
    const obj= {
      "statusId": 2,
      "statusName": "Declined",
      "type": "",
      "statusType": "SO"
    }
    mockstatusService.GetStatusByType.and.returnValue(of(obj))
    component.GetStatusByType()
    expect(component.GetStatusByType()).toBeTruthy()
  })
  it('GetDropdown8',()=>{
    const obj=  {
      "usttpmId": 69,
      "usttpmName": "Udaya Punnani",
      "type": ""
    }
    mocktpmService.GetAllUSTTPMData.and.returnValue(of(obj))
    component.GetDropdown8()
    expect(component.GetDropdown8()).toBeTruthy()
  })
  it('GetDropdown7',()=>{
    const obj=  {
      "regionId": 4,
      "region": "US",
      "type": ""
    }
    mockregionService.GetAllRegionData.and.returnValue(of(obj))
    component.GetDropdown7()
    expect(component.GetDropdown7()).toBeTruthy()
  })

  it('GetDropdown10',()=>{
    const obj= {
      "soW_CandidateId": 2,
      "sowId": 6,
      "candidateId": 5,
      "statusId": 2,
      "type": "",
      "soName": "prathyusha123",
      "candidateName": "prathyushareddy12",
      "statusName": "Declined"
    }
    mockmappingService.GetAllCandidateMappingData.and.returnValue(of(obj))
    component.GetDropdown10()
    expect(component.GetDropdown10()).toBeTruthy()
  })
  it('canExit',()=>{
    component.canExit()
    
  })
  it('cancel',()=>{
    component.cancel()
  })
  it('should prompt confirmation when SowForm is dirty', () => {
    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
    component.SowForm.markAsDirty(); 
   component.canExit(); 
    expect(confirmSpy).toHaveBeenCalledWith('You have unsaved changes. Do you really want to discard these changes?');
    expect(component.canExit()).toBeTrue();
  });
  it('GetDropdown11',()=>{
    const obj=  {
      "locationId": 5,
      "location": "BNG",
      "regionId": 1,
      "type": ""
    }
    mocklocationService.GetAllLocationData.and.returnValue(of(obj))
    component.GetDropdown11()
    expect(component.GetDropdown11()).toBeTruthy()
  })
  it('isFieldInvalid',()=>{
    const fieldName='R&D'
    const control={invalid:true,touched:true}
    spyOn(component.SowForm,'get').and.returnValue(control as AbstractControl)
    expect(component.isFieldInvalid(fieldName)).toBe(true)
  })
  it('onAdd',()=>{
    const obj={
      soName: "Bhagya1",
      jrCode: "14",
      requestCreationDate: "2023-04-04T13:26:08.807",
      accountId: "3",
      technologyId: '175',
      role: "admin",
      locationId: '3',
      regionId: '3',
      targetOpenPositions: '1',
      positionsTobeClosed: '1',
      ustpocId: '37',
      recruiterId: '27',
      usttpmId: '66',
      dellManagerId: '573',
      statusId: '3',
      band: "A",
      projectId: "dhhef",
      accountManager: "mahesh",
      externalResource: "test1",
      internalResource: "chaithra",
      type:"insert"
    }
    mockservice.PostSowData.and.returnValue(of(obj))
    component.onAdd()
    expect(component.onAdd)
  })
  it('markAllFieldsAsTouched',()=>{
    component.markAllFieldsAsTouched();
  })
  it('onSubmit,should call onAdd',()=>{
    
    component.onSubmit()
  })
 
});
