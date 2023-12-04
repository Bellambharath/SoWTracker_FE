import { TestBed } from '@angular/core/testing';
import { SodatafetchService } from './sodatafetch.service';
import { AccountModel } from 'src/app/Models/AccountModel';
import { TechnologyModel } from 'src/app/Models/TechnologyModel';
import { RecruiterModel } from 'src/app/Models/RecruiterModel';
import { USTPOCModel } from 'src/app/Models/USTPOCModel';
import { DellManagerModel } from 'src/app/Models/DellManagerModel';
import { StatusModel } from 'src/app/Models/StatusModel';
import { RegionModel } from 'src/app/Models/RegionModel';
import { LocationModel } from 'src/app/Models/LocationModel';
import { USTTPMModel } from 'src/app/Models/USTTPMModel';
import { MappingModel } from 'src/app/Models/MappingModel';
import { of } from 'rxjs';
import { AccountService } from './shared/Services/AccountService/account.service';
import { TechnologyService } from './shared/Services/TechnologyService/technology.service';
import { UstPocService } from './shared/Services/UstpocService/ust-poc.service';
import { RecruiterService } from './shared/Services/RecruiterService/recruiter.service';
import { DellManagerService } from './shared/Services/DellManagerService/dell-manager.service';
import { StatusService } from './shared/Services/StatusService/status.service';
import { RegistrationComponent } from './registration/registration.component';
import { RegionService } from './shared/Services/RegionService/region.service';
import { LocationService } from './shared/Services/LocationService/location.service';
import { UstTpmService } from './shared/Services/UsttpmService/ust-tpm.service';
import { CandidateDetailsComponent } from './candidate/candidate-details/candidate-details.component';
import { CandidateMappingService } from './shared/Services/CandidateMappingService/candidate-mapping.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SodatafetchService', () => {
  let service: SodatafetchService;

 let mockAccountService:any,mockTechnologyService:any,mockRecruiterService:any,
 mockUstPocService:any,mockDellManagerService:any,mockStatusService:any,
 mockRegionService:any,mockLocationService:any,
 mockUstTpmService:any,mockCandidateMappingService:any
  beforeEach(() => {
    mockAccountService=jasmine.createSpyObj('AccountService',['GetAllAccountData'])
    mockTechnologyService=jasmine.createSpyObj('TechnologyService',['GetAllTechData'])
    mockRecruiterService=jasmine.createSpyObj('RecruiterService',['GetAllRecruiterData'])
    mockUstPocService=jasmine.createSpyObj('UstPocService',['GetAllUstPocData'])
    mockDellManagerService=jasmine.createSpyObj('DellManagerService',['GetAllDellManagerData'])
    mockStatusService=jasmine.createSpyObj('StatusService',['GetAllStatusData'])
    mockRegionService=jasmine.createSpyObj('RegionService',['GetAllRegionData'])
    mockLocationService=jasmine.createSpyObj('LocationService',['GetAllLocationData'])
    mockUstTpmService=jasmine.createSpyObj('UstTpmService',['GetAllUSTTPMData'])
    mockCandidateMappingService=jasmine.createSpyObj('CandidateMappingService',['GetAllCandidateMappingData'])
    TestBed.configureTestingModule({
      providers: [
        SodatafetchService,
        { provide: AccountService, useValue: mockAccountService },
        { provide: TechnologyService, useValue: mockTechnologyService },
        { provide: RecruiterService, useValue: mockRecruiterService },
        { provide: UstPocService, useValue: mockUstPocService },
        { provide: DellManagerService, useValue: mockDellManagerService },
        { provide: StatusService, useValue:  mockStatusService},
        { provide: RegionService, useValue:  mockRegionService},
        { provide: LocationService, useValue: mockLocationService },
        { provide: UstTpmService, useValue: mockUstTpmService },
        { provide: CandidateMappingService, useValue:  mockCandidateMappingService},
        
      ],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(SodatafetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAccountData', () => {
    const obj={accountId: 1,
      accountName: "DL-IN",
      type: ""}
      mockAccountService.GetAllAccountData.and.returnValue(of(obj))
    
    service.getAccountData().subscribe((obj) => {
      
      expect(obj).toBeTruthy();
     
     
    });
  })

  it('getTechnologyData', () => {
    const data=
    {
      technologyId: 188,
      technologyName: "XSLT and XSLFO ",
      domainId: 6,
      type: "",
      domainName: "Others"
    }
    mockTechnologyService.GetAllTechData.and.returnValue(of(data))
    service.getTechnologyData().subscribe((data) => {
     
      expect(data).toBeTruthy();
      
      
    });
  })
  it('getRecruiterData', () => {
    const data=
    {
      recruiterId: 31,
      recruiterName: "Varnitha",
      type: ""
    }
    mockRecruiterService.GetAllRecruiterData.and.returnValue(of(data))
    service.getRecruiterData().subscribe((data) => {
      expect(data).toBeTruthy();
   });

  })
  
  it('getUstPocData', () => {
    const data=
    {
      ustpocId: 42,
      ustpocName: "Rakshitha B / MoonRaft",
      type: ""
    }
    mockUstPocService.GetAllUstPocData.and.returnValue(of(data))
    service.getUstPocData().subscribe((data) => {
      expect(data).toBeTruthy();
   });

  })
  it('getDellManagerData', () => {
    const obj={
      dellManagerId: 587,
      dellManagerName: "Viswa k",
      type: ""
    }
      mockDellManagerService.GetAllDellManagerData.and.returnValue(of(obj))
    
    service.getDellManagerData().subscribe((obj) => {
      
      expect(obj).toBeTruthy();
     
     
    });
  })

  it('getStatusData', () => {
    const data=
    {
      statusId: 6,
    statusName: "Rejected",
      type: "",
      statusType: "Candidate"
    }
    mockStatusService.GetAllStatusData.and.returnValue(of(data))
    service.getStatusData().subscribe((data) => {
     
      expect(data).toBeTruthy();
      
      
    });
  })
  it('getRegionData', () => {
    const data=
    {
      regionId: 3,
      region: "SG",
      type: ""
    }
    mockRegionService.GetAllRegionData.and.returnValue(of(data))
    service.getRegionData().subscribe((data) => {
      expect(data).toBeTruthy();
   });

  })
  
  it('getLocationData', () => {
    const data=
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
    mockLocationService.GetAllLocationData.and.returnValue(of(data))
    service.getLocationData().subscribe((data) => {
      expect(data).toBeTruthy();
   });

  })
  it('getUstTpmData', () => {
    const data=
    {
      usttpmId: 69,
      usttpmName: "Udaya Punnani",
      type: ""
    }
    mockUstTpmService.GetAllUSTTPMData.and.returnValue(of(data))
    service.getUstTpmData().subscribe((data) => {
      expect(data).toBeTruthy();
   });

  })
  
  it('getCandidateMappingData', () => {
    const data=
    {
      dellManagerId: 587,
      dellManagerName: "Viswa k",
      type: ""
    }
    mockCandidateMappingService.GetAllCandidateMappingData.and.returnValue(of(data))
    service.getCandidateMappingData().subscribe((data) => {
      expect(data).toBeTruthy();
   });

  })
  

});
