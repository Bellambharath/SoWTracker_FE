import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';
import { SoService } from 'src/app/shared/Services/SoService/so.service';
import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';

import { SoDetailsComponent } from './so-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { RegionService } from 'src/app/shared/Services/RegionService/region.service';
import { LocationService } from 'src/app/shared/Services/LocationService/location.service';
import { AccountService } from 'src/app/shared/Services/AccountService/account.service';
import { UstTpmService } from 'src/app/shared/Services/UsttpmService/ust-tpm.service';
import { UstPocService } from 'src/app/shared/Services/UstpocService/ust-poc.service';
import { RecruiterService } from 'src/app/shared/Services/RecruiterService/recruiter.service';
import { DellManagerService } from 'src/app/shared/Services/DellManagerService/dell-manager.service';
import { TechnologyService } from 'src/app/shared/Services/TechnologyService/technology.service';
import { CandidateMappingComponent } from 'src/app/candidate-mapping/candidate-mapping.component';
import { CandidateMappingService } from 'src/app/shared/Services/CandidateMappingService/candidate-mapping.service';

describe('SoDetailsComponent', () => {
  let component: SoDetailsComponent;
  let fixture: ComponentFixture<SoDetailsComponent>;
  let  mockexcelService:any,mockroute,mockservice:any,mockregionService:any,
  mocklocationService:any,mockaccountService:any,mocktpmService:any,mockpocService:any,
  mockrecruiterService:any,mockdellManagerService:any,mocktechService:any,
  mockstatusService:any,mockmappingService:any,mockservicedata:any,mockrouter:any,mockuserData:any

  beforeEach(() => {
    mockservice = jasmine.createSpyObj('SoService', [
      'PostSOWDuplicateCheck', 'GetAllSowData', 'PostSowData',
      'DeleteSowData', 'UpdateSowData',
      'GetSowById', 'GetSOByDate'])
    mockroute = jasmine.createSpyObj('Router', ['navigate', 'queryParams'])
    mockstatusService = jasmine.createSpyObj('StatusserviceService', ['GetStatusByType'])
    mockexcelService = jasmine.createSpyObj('ExcelService', ['jsonExportAsExcel'])

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
      declarations: [SoDetailsComponent],
      providers: [{provide:ExcelService,useValue:mockexcelService},
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
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
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
      
      let mockuserData = {

        "LoginName": "bharath", 
        "EmailId": "bharath@gmail.com", 
        "RoleName": "Admin", 
        "ScreenNames": "CandidateDetails,SOW,Mapping,ChangePassword,Admin", 
        "TabNames": "Candidate,SO,Account,DellManager,Domain,Location,Registration,Region,Recruiter,Technology,USTPOC,USTTPM", "Status": "1", "PermissionName": "Edit", "FailureAttempts": 0, "Islock": false, "IsFirstLogin": false
  
      }
  
      sessionStorage.setItem('userData', JSON.stringify(mockuserData))
    fixture = TestBed.createComponent(SoDetailsComponent);
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
  it('cancelfilter',()=> {
    component.cancelfilter()
    expect(component.cancelfilter).toBeDefined()
  })
  it('toggleFormVisibility',() =>{
    component.toggleFormVisibility()
    expect(component.toggleFormVisibility).toBeDefined()
  })
  it('resetAndCloseFilter',()=> {
    component.resetAndCloseFilter()
  })
  it('clearSearchInput', ()=> {
    component.clearSearchInput()
  })
  
  it('ClearFilter',()=>{
    component.ClearFilter()
  })
  it('applyFilter',()=> {
    component.applyFilter()
  })
  it('formatdate',()=>{
    component.formatdate("2023-08-01")
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
  it('deleteDetails',()=> {
    spyOn(window,'confirm').and.returnValue(true)
    const data= {
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
    }
    component.deleteDetails(data)
    expect( component.deleteDetails(data.sowId)).toBe()
  })
  it('cancelEdit',()=>{
    const data= {
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
    }
    component.cancelEdit(data)
  })
  it('saveSODetails',()=>{
    const data= {
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
      "statusName": "Closed",
      "onboardingdate":"2023-06-15T00:00:00"
    }
    component.saveSODetails(data)
  })
  it('saveSODetails',()=>{
    mockservice.UpdateSowData.and.returnValue(throwError(()=>{
      new Error("Data not updated")
    }))
    const data= {
      "sowId": 0,
      "soName": "",
      "jrCode": "",
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
      "statusName": "Closed",
      "onboardingdate":"2023-06-15T00:00:00"
    }
    component.saveSODetails(data)
  })
  it('updateSODetails',()=>{
    const data= {
      "selectedDate": new Date(),
      "sowId": 1,
      "soName": "",
      "jrCode": "",
      "requestCreationDate": new Date(),
      "accountId": 1,
      "technologyId": 3,
      "role": "string",
      "locationId": 1,
      "regionId": 1,
      "targetOpenPositions": 1,
      "positionsTobeClosed": 3,
      "ustpocId": 3,
      "recruiterId": 3,
      "usttpmId": 2,
      "dellManagerId": 1,
      "statusId": 1,
      "band": "string",
      "projectId": "string",
      "accountManager": "string",
      "externalResource": "string",
      "internalResource": "",
      "type": "string",
      "AccountName": "string",
      "TechnologyName": "string",
      "Location": "string",
      "Region": "string",
      "USTPOCName": "string",
      "RecruiterName": "string",
      "USTTPMName": "string",
      "DellManagerName": "string",
      "StatusName": "string",

      "isEditing": false
    }
    component.updateSODetails(data)
  })
  it('DownloadExcel',()=>{
   
    const data= {
      "sowId": 0,
      "soName": "",
      "jrCode": "",
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
    }
    const headers = [
      'SO Name',
      'JR Code',
      'Request Creation Date',
      'Account',
      'Technology',
      'Role',
      'Region',
      'Location',
      'Target Open Positions',
      'Positions Tobe Closed',
      'Ust POC',
      'Recruiter',
      'Ust TPM',
      'Dell Manager',
      'Status',
      'Band',
      'Project Id',
      'Account Manager',
      'External Resource',
      'Internal Resource',
    ];
    mockexcelService.jsonExportAsExcel.and.returnValue(of(data,"SO Detail",headers))
    component.DownloadExcel();
  })
  it('addfile', () => {
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
    component.addfile(event);
    expect(component.file).toEqual(file);
  });

  it('addfile', () => {
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
    mockservice.PostSOWDuplicateCheck.and.returnValue(of(mockservicedata))
    mockservice.GetAllSowData.and.returnValue(of(mockservicedata))
    component.addfile(event)
  })

  it('addfile', () => {
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
    mockservice.PostSOWDuplicateCheck.and.returnValue(of(mockservicedata))
    mockservice.GetAllSowData.and.returnValue(throwError(() => {
      new Error("no file")
    }))
    component.addfile(event)
  })
  it('onRegionSelected',()=>{
    const id =1 
    spyOn(component,'GetDropdown9');
    component.onRegionSelected("1");

  })
});
