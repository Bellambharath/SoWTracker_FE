import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabChangeEvent, MatTab } from '@angular/material/tabs';
import { AdminComponent } from './admin.component';
import { AdminService } from '../shared/Services/admin.service';
import { AccountService } from '../shared/Services/AccountService/account.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { RegionService } from '../shared/Services/RegionService/region.service';
import { LocationService } from '../shared/Services/LocationService/location.service';
import { DomainComponent } from '../domain/domain.component';
import { UstTpmService } from '../shared/Services/UsttpmService/ust-tpm.service';
import { RecruiterService } from '../shared/Services/RecruiterService/recruiter.service';
import { UstPocService } from '../shared/Services/UstpocService/ust-poc.service';
import { DellManagerService } from '../shared/Services/DellManagerService/dell-manager.service';
import { TechnologyService } from '../shared/Services/TechnologyService/technology.service';
import { ExcelService } from '../shared/Services/ExcelService/excel.service';
import { RegistrationService } from '../shared/Services/RegistrationService/registration.service';
import { LoginService } from '../shared/Services/LoginService/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionPanelDescription } from '@angular/material/expansion';
import { RegionModel } from '../Models/RegionModel';
import { MatTableDataSource } from '@angular/material/table';
import { DellManagerModel } from '../Models/DellManagerModel';
import { DomainModel } from '../Models/DomainModel';
import { LocationModel } from '../Models/LocationModel';
import { RegistrationModel } from '../Models/RegistrationModel';
import { RecruiterModel } from '../Models/RecruiterModel';
import { USTPOCModel } from '../Models/USTPOCModel';
import { USTTPMModel } from '../Models/USTTPMModel';
import { TechnologyModel } from '../Models/TechnologyModel';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockadminservice: any, mockaccountService: any, mockregionService: any, mocklocationService: any, mockdomainService: any,
    mocktpmService: any, mockpocService: any, mockrecruiterService: any, mockdellManagerService: any, mocktechService: any,
    mockexcelService, mockregistrationService: any, mockloginService: any, mockAllAccounts: any, mockAllRoles: any,
    mockTechData: any, mockRegionData: any, mockDellManagerData: any, mockDomainData: any, mockLocationData: any,
    mockregistrationData: any, mockRecruiterData: any, mockUSTPOCData: any, mockUSTTPMData: any, mockMatSnackBar: any, mockuserData: any

  beforeEach(() => {
    mockaccountService = jasmine.createSpyObj('AccountService', ['GetAllAccountData', 'PostAccountData', 'DeleteAccountData', 'UpdateAccountData',
      'GetAccountById'])
    mockregionService = jasmine.createSpyObj('RegionService', ['GetAllRegionData', 'PostRegionData', 'DeleteRegionData', 'UpdateRegionData',])

    mocklocationService = jasmine.createSpyObj('LocationService', ['GetAllLocationData', 'GetLocationByRegionId', 'PostLocationData', 'DeleteLocationData',
      'UpdateLocationData', 'GetLocationById'])

    mockdomainService = jasmine.createSpyObj('DomainService', ['GetAllDomainData', 'PostDomainData', 'DeleteDomainData', 'UpdateDomainData', 'GetDomainById'])

    mocktpmService = jasmine.createSpyObj('UstTpmService', ['GetAllUSTTPMData', 'PostUSTTPMData', 'DeleteUSTTPMData', 'UpdateUSTTPMData', 'GetUSTTPMById'])

    mockpocService = jasmine.createSpyObj('UstPocService', ['GetAllUstPocData', 'PostUstPocData', 'DeleteUstPocData', 'UpdateUstPocData', 'GetUstPocById'])

    mockrecruiterService = jasmine.createSpyObj('RecruiterService', ['GetAllRecruiterData', 'PostRecruiterData', 'DeleteRecruiterData', 'UpdateRecruiterData', 'GetRecruiterById'])

    mockdellManagerService = jasmine.createSpyObj('DellManagerService', ['GetAllDellManagerData', 'PostDellManagerData', 'DeleteDellManagerData', 'UpdateDellManagerData', 'GetDellManagerById'])

    mocktechService = jasmine.createSpyObj('TechnologyService', ['GetAllTechData', 'PostTechData', 'DeleteTechData', 'UpdateTechData', 'GetTechById'])

    mockexcelService = jasmine.createSpyObj('ExcelService', ['exportAsExcelFile', 'jsonExportAsExcel', 'isObject', 'getKeys', 'isValue', 'saveAsExcelFile'])

    mockregistrationService = jasmine.createSpyObj('RegistrationService', ['GetRoleData', 'PostRegistrationData', 'GetLoginData', 'UpdateLoginData', 'DeleteLoginData', 'UpdateIsLock'])

    mockloginService = jasmine.createSpyObj('LoginService', ['GetUserData', 'PutUserData', 'GetLoginData', 'UpdateIsLock'])

    mockMatSnackBar=jasmine.createSpyObj('MatSnackBar',['open'])

    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [{ provide: AccountService, useValue: mockaccountService },
      { provide: RegionService, useValue: mockregionService },
      { provide: LocationService, useValue: mocklocationService },
      { provide: DomainComponent, useValue: mockdomainService },
      { provide: UstTpmService, useValue: mocktpmService },
      { provide: UstPocService, useValue: mockpocService },
      { provide: RecruiterService, useValue: mockrecruiterService },
      { provide: DellManagerService, useValue: mockdellManagerService },
      { provide: TechnologyService, useValue: mocktechService },
      { provide: ExcelService, useValue: mockexcelService },
      { provide: RegistrationService, useValue: mockregistrationService },
      { provide: LoginService, useValue: mockloginService },
      { provide: MatSnackBar, useValue: mockMatSnackBar }


      ],
      imports: [
        HttpClientModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    mockAllAccounts = [
      {
        accountId: 5,
        accountName: "DL-N",
        type: ""
      },
      {
        accountId: 4,
        accountName: "DL-MY",
        type: ""
      },
      {
        accountId: 3,
        accountName: "DL-USTI",
        type: ""
      },
      {
        accountId: 2,
        accountName: "DL-US",
        type: ""
      },
      {
        accountId: 1,
        accountName: "DL-IN",
        type: ""
      }

    ]
    mockAllRoles = [
      {
        "emailId": "",
        "failureAttempts": 0,
        "isLock": false,
        "loginId": 0,
        "loginName": "",
        "loginPassword": "",
        "roleId": 1,
        "roleName": "Admin",
        "type": ""
      },
      {
        "emailId": "",
        "failureAttempts": 0,
        "isLock": false,
        "loginId": 0,
        "loginName": "",
        "loginPassword": "",
        "roleId": 2,
        "roleName": "DM",
        "type": ""
      },
      {
        "emailId": "",
        "failureAttempts": 0,
        "isLock": false,
        "loginId": 0,
        "loginName": "",
        "loginPassword": "",
        "roleId": 2,
        "roleName": "DM",
        "type": ""
      },
      {
        "emailId": "",
        "failureAttempts": 0,
        "isLock": false,
        "loginId": 0,
        "loginName": "",
        "loginPassword": "",
        "roleId": 2,
        "roleName": "DM",
        "type": ""
      },
      {
        "emailId": "",
        "failureAttempts": 0,
        "isLock": false,
        "loginId": 0,
        "loginName": "",
        "loginPassword": "",
        "roleId": 3,
        "roleName": "Recruiter",
        "type": ""
      },
      {
        "emailId": "",
        "failureAttempts": 0,
        "isLock": false,
        "loginId": 0,
        "loginName": "",
        "loginPassword": "",
        "roleId": 4,
        "roleName": "TPM",
        "type": ""
      },
      {
        "emailId": "",
        "failureAttempts": 0,
        "isLock": false,
        "loginId": 0,
        "loginName": "",
        "loginPassword": "",
        "roleId": 5,
        "roleName": "POC",
        "type": ""
      }

    ]
    mockTechData = [
      {
        "technologyId": 185,
        "technologyName": "UX Designer",
        "domainId": 10,
        "type": "",
        "domainName": "R&D"
      },
      {
        "technologyId": 184,
        "technologyName": "UX - Product Designer",
        "domainId": 12,
        "type": "",
        "domainName": "UX/UI"
      },
    ]
    mockRegionData = [
      {
        "regionId": 4,
        "region": "US",
        "type": ""
      },
      {
        "regionId": 3,
        "region": "SG",
        "type": ""
      },
      {
        "regionId": 2,
        "region": "MY",
        "type": ""
      },
      {
        "regionId": 1,
        "region": "IN",
        "type": ""
      }
    ]
    mockDellManagerData = [
      {
        "dellManagerId": 587,
        "dellManagerName": "Viswa k",
        "type": ""
      },
      {
        "dellManagerId": 586,
        "dellManagerName": "Viswa",
        "type": ""
      },
      {
        "dellManagerId": 585,
        "dellManagerName": "Vishwanath Megnath",
        "type": ""
      },
      {
        "dellManagerId": 583,
        "dellManagerName": "Vishwa BR",
        "type": ""
      },
      {
        "dellManagerId": 581,
        "dellManagerName": "Vishwa",
        "type": ""
      },
      {
        "dellManagerId": 577,
        "dellManagerName": "Vinitha",
        "type": ""
      },
      {
        "dellManagerId": 576,
        "dellManagerName": "Vineetha",
        "type": ""
      },
      {
        "dellManagerId": 575,
        "dellManagerName": "Vinay Parthasarathy",
        "type": ""
      },
      {
        "dellManagerId": 574,
        "dellManagerName": "Vinay",
        "type": ""
      },
      {
        "dellManagerId": 573,
        "dellManagerName": "Vikranth",
        "type": ""
      },
      {
        "dellManagerId": 572,
        "dellManagerName": "Vikrant",
        "type": ""
      },
      {
        "dellManagerId": 570,
        "dellManagerName": "Vijay Ragam",
        "type": ""
      },
      {
        "dellManagerId": 567,
        "dellManagerName": "Umesh/Mathew",
        "type": ""
      },
      {
        "dellManagerId": 566,
        "dellManagerName": "Umesh/Akta",
        "type": ""
      },
      {
        "dellManagerId": 564,
        "dellManagerName": "Uday",
        "type": ""
      },
      {
        "dellManagerId": 562,
        "dellManagerName": "Tousif",
        "type": ""
      },
    ]
    mockDomainData =
      [
        {
          "domainId": 12,
          "domainName": "UX/UI",
          "type": ""
        },
        {
          "domainId": 11,
          "domainName": "Support",
          "type": ""
        }
      ]
    mockLocationData = [
      {
        "locationId": 5,
        "location": "BNG",
        "regionId": 3,
        "type": ""
      },
      {
        "locationId": 4,
        "location": "MY",
        "regionId": 4,
        "type": ""
      },
      {
        "locationId": 3,
        "location": "SG",
        "regionId": 1,
        "type": ""
      },
      {
        "locationId": 2,
        "location": "HYD",
        "regionId": 1,
        "type": ""
      },
      {
        "locationId": 1,
        "location": "US",
        "regionId": 4,
        "type": ""
      }
    ]
    mockregistrationData = [
      {
        "loginName": "Admin",
        "loginPassword": "",
        "loginId": 1,
        "emailId": "admin@gmail.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      },
      {
        "loginName": "Darshan",
        "loginPassword": "",
        "loginId": 2,
        "emailId": "darshan@admin.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      }
    ]

    mockRecruiterData = [
      {
        "recruiterId": 6,
        "recruiterName": "Sumant G",
        "type": ""
      },
      {
        "recruiterId": 5,
        "recruiterName": "Niriksha G",
        "type": ""
      },
      {
        "recruiterId": 4,
        "recruiterName": "Ashwini N",
        "type": ""
      }
    ]

    mockUSTPOCData = [
      {
        "ustpocId": 8,
        "ustpocName": "Rahul",
        "type": ""
      },
      {
        "ustpocId": 7,
        "ustpocName": "Chitralekha M / Practice",
        "type": ""
      },
      {
        "ustpocId": 6,
        "ustpocName": "Rakshitha B / MoonRaft",
        "type": ""
      }]
    mockUSTTPMData = [
      {
        "usttpmId": 27,
        "usttpmName": "Vasu K",
        "type": ""
      },
      {
        "usttpmId": 26,
        "usttpmName": "Udaya Punnani",
        "type": ""
      }]
    let mockuserData = {

      "LoginName": "bharath", 
      "EmailId": "bharath@gmail.com", 
      "RoleName": "Admin", 
      "ScreenNames": "CandidateDetails,SOW,Mapping,ChangePassword,Admin", 
      "TabNames": "Candidate,SO,Account,DellManager,Domain,Location,Registration,Region,Recruiter,Technology,USTPOC,USTTPM", "Status": "1", "PermissionName": "Edit", "FailureAttempts": 0, "Islock": false, "IsFirstLogin": false

    }

    sessionStorage.setItem('userData', JSON.stringify(mockuserData))
    fixture = TestBed.createComponent(AdminComponent);

    component = fixture.componentInstance;


    mocklocationService.UpdateLocationData.and.returnValue(of("Location updated successfully success"));
    mocklocationService.GetAllLocationData.and.returnValue(of(mockLocationData))
    mocktechService.DeleteTechData.and.returnValue(of(mockTechData));
    mocktechService.GetAllTechData.and.returnValue(of(mockTechData))
    mockaccountService.GetAllAccountData.and.returnValue(of(mockAllAccounts));
    mockregistrationService.GetRoleData.and.returnValue(of(mockAllRoles))
    mockregistrationService.GetLoginData.and.returnValue(of(mockregistrationData))

    mockdellManagerService.GetAllDellManagerData.and.returnValue(of(mockDellManagerData))
    mockregionService.GetAllRegionData.and.returnValue(of(mockRegionData));
    mockdomainService.UpdateDomainData.and.returnValue(of(mockDomainData))
    mockdomainService.GetAllDomainData.and.returnValue(of(mockDomainData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onTabChange should Change to Registration', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'Registration',
      } as MatTab,
    };

    spyOn(component, 'getRegistration');
    spyOn(component, 'closeLocationForm');
    spyOn(component, 'closeAccountForm');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);
    expect(component.getRegistration).toHaveBeenCalled();
    expect(component.closeLocationForm).toHaveBeenCalled();
    expect(component.closeAccountForm).toHaveBeenCalled();

    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });

  it('onTabChange should Change to Account', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'Account',
      } as MatTab,
    };

    spyOn(component, 'getAccounts');
    spyOn(component, 'closeLocationForm');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);
    expect(component.getAccounts).toHaveBeenCalled();
    expect(component.closeLocationForm).toHaveBeenCalled();

    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });

  it('onTabChange should Change to DellManager', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'DellManager',
      } as MatTab,
    };

    spyOn(component, 'getDellManager');
    spyOn(component, 'closeLocationForm');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeAccountForm');

    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);

    expect(component.getDellManager).toHaveBeenCalled();
    expect(component.closeLocationForm).toHaveBeenCalled();
    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });

  it('onTabChange should Change to Domain', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'Domain',
      } as MatTab,
    };
    spyOn(component, 'getDomain');
    
    spyOn(component, 'closeLocationForm');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeAccountForm');

    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);

    expect(component.getDomain).toHaveBeenCalled();
    
    expect(component.closeLocationForm).toHaveBeenCalled();
    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeAccountForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });

  it('onTabChange should Change to Recruiter', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'Recruiter',
      } as MatTab,
    };
    spyOn(component, 'getRecruiter');
    spyOn(component, 'closeLocationForm');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeAccountForm');

    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);

    expect(component.getRecruiter).toHaveBeenCalled();
    expect(component.closeLocationForm).toHaveBeenCalled();
    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeAccountForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });

  it('onTabChange should Change to USTTPM', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'USTTPM',
      } as MatTab,
    };
    spyOn(component, 'getUSTTPM');
    spyOn(component, 'closeLocationForm');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeAccountForm');
    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);

    expect(component.getUSTTPM).toHaveBeenCalled();
    expect(component.closeLocationForm).toHaveBeenCalled();
    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeAccountForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });


  it('onTabChange should Change to USTPOC', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'USTPOC',
      } as MatTab,
    };
    spyOn(component, 'getUstPoc');
    spyOn(component, 'closeLocationForm');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeAccountForm');
    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);

    expect(component.getUstPoc).toHaveBeenCalled();
    expect(component.closeLocationForm).toHaveBeenCalled();
    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeAccountForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });

  it('onTabChange should Change to Region', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'Region',
      } as MatTab,
    };
    spyOn(component, 'getRegion');
    spyOn(component, 'closeLocationForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeAccountForm');
    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);

    expect(component.getRegion).toHaveBeenCalled();
    expect(component.closeLocationForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeAccountForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });

  it('onTabChange should Change to Location', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'Location',
      } as MatTab,
    };
    spyOn(component, 'getRegion');
    spyOn(component, 'getLocation');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeAccountForm');
    spyOn(component, 'closeTechnlogyForm');

    component.onTabChange(mockTabChangeEvent);

    expect(component.getRegion).toHaveBeenCalled();
    expect(component.getLocation).toHaveBeenCalled();
    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeAccountForm).toHaveBeenCalled();
    expect(component.closeTechnlogyForm).toHaveBeenCalled();
  });


  it('onTabChange should Change to Technology', () => {

    const mockTabChangeEvent: MatTabChangeEvent = {
      index: 0,
      tab: {
        textLabel: 'Technology',
      } as MatTab,
    };
    spyOn(component, 'getTechnology');
    spyOn(component, 'closeRegionForm');
    spyOn(component, 'closeUSTPOCForm');
    spyOn(component, 'closeDellManagerForm');
    spyOn(component, 'closeDomainForm');
    spyOn(component, 'closeUSTTPMForm');
    spyOn(component, 'closeRecruiterForm');
    spyOn(component, 'closeAccountForm');
    spyOn(component, 'closeLocationForm');

    component.onTabChange(mockTabChangeEvent);

    expect(component.getTechnology).toHaveBeenCalled();
    expect(component.closeRegionForm).toHaveBeenCalled();
    expect(component.closeUSTPOCForm).toHaveBeenCalled();
    expect(component.closeDellManagerForm).toHaveBeenCalled();
    expect(component.closeDomainForm).toHaveBeenCalled();
    expect(component.closeUSTTPMForm).toHaveBeenCalled();
    expect(component.closeRecruiterForm).toHaveBeenCalled();
    expect(component.closeAccountForm).toHaveBeenCalled();
    expect(component.closeLocationForm).toHaveBeenCalled();
  });

  it('GetTechnology', () => {
    mocktechService.GetAllTechData.and.returnValue(of(mockTechData))
    component.getTechnology();
    expect(component.technologyDataSource).toBe;
  })

  it('saveTechnology ', () => {
    mocktechService.UpdateTechData.and.returnValue(of("Technology Updated Successfully"))

    component.saveTechnology(mockTechData[0]);

  })
  it('saveTechnology Thrown error', () => {
    mocktechService.UpdateTechData.and.returnValue(throwError(() => {
      new Error("Error updating Technology data")
      component.saveTechnology(mockTechData[0])
    }))

    component.saveTechnology(mockTechData[0]);

  })

  it('UpdateTechnology ', () => {
    component.updateTechnology(mockTechData[0]);
    expect(mockTechData[0].isEditing).toBeTrue;
  })

  it('cancelTechnologyChanges ', () => {
    spyOn(component, 'getTechnology');
    component.cancelTechnologyChanges(mockTechData[0]);

    expect(component.getTechnology).toHaveBeenCalled();

  })

  it('deleteTechnologyData ', () => {
    const data = {
      "technologyId": 185,
      "technologyName": "UX Designer",
      "domainId": 10,
      "type": "",
      "domainName": "R&D"
    }
    component.deleteTechnologyData(data);
    expect(component.deleteTechnologyData(data)).toBe()

  })

  it('getRegionName should return null', () => {
    component.getRegionName(mockRegionData[0].regionId);

  })

  it('getRegionName should return regionName', () => {

    const dataSource = new MatTableDataSource<RegionModel>(mockRegionData);
    component.regionDataSource = dataSource;


    const regionName = component.getRegionName(mockRegionData[0].regionId);

    expect(regionName).toEqual('US');
  });

  it('getRegionName should return null', () => {

    const dataSource = new MatTableDataSource<RegionModel>(mockRegionData);
    component.regionDataSource = dataSource;

    const regionId = 7;
    const regionName = component.getRegionName(regionId);

    expect(regionName).toBe;
  });

  it('applyFilterAccount', () => {
    component.applyFilterAccount();
  })

  it('applyFilterDellManager', () => {
    const dataSource = new MatTableDataSource<DellManagerModel>(mockDellManagerData);
    component.dellManagerDataSource = dataSource;
    component.applyFilterDellManager();
  })

  it('applyFilterDomain', () => {
    const dataSource = new MatTableDataSource<DomainModel>(mockDomainData);
    component.domainDataSource = dataSource;
    component.applyFilterDomain();
  })

  it('applyFilterLocation', () => {
    const dataSource = new MatTableDataSource<LocationModel>(mockLocationData);
    component.locationDataSource = dataSource;
    component.applyFilterLocation();
  })

  it('applyFilterRegistration', () => {
    const dataSource = new MatTableDataSource<RegistrationModel>(mockregistrationData);
    component.registrationDataSource = dataSource;
    component.applyFilterRegistration();
  })


  it('applyFilterRegion', () => {
    const dataSource = new MatTableDataSource<RegionModel>(mockRegionData);
    component.regionDataSource = dataSource;
    component.applyFilterRegion();
  })

  it('applyFilterRecruiter', () => {
    const dataSource = new MatTableDataSource<RecruiterModel>(mockRecruiterData);
    component.recruiterDataSource = dataSource;
    component.applyFilterRecruiter();
  })

  it('applyFilterUSTPOC', () => {
    const dataSource = new MatTableDataSource<USTPOCModel>(mockUSTPOCData);
    component.ustPocDataSource = dataSource;
    component.applyFilterUSTPOC();
  })

  it('applyFilterUSTTPM', () => {
    const dataSource = new MatTableDataSource<USTTPMModel>(mockUSTTPMData);
    component.ustTpmDataSource = dataSource;
    component.applyFilterUSTTPM();
  })

  it('getDomainName should return null', () => {

    component.getDomainName(mockDomainData[0].domainId);
  })

  it('getDomainName', () => {
    const dataSource = new MatTableDataSource<DomainModel>(mockDomainData);
    component.domainDataSource = dataSource;
    component.getDomainName(mockDomainData[0].domainId);
  })

  it('getDomainName return domain name null', () => {
    const dataSource = new MatTableDataSource<DomainModel>(mockDomainData);
    component.domainDataSource = dataSource;
    component.getDomainName(0);
  })
  it('TabLevelAccess', () => {
    component.TabLevelAccess();
  })

  it('openTechnologyForm', () => {
    component.openTechnologyForm();
  })

  it('applyFilterTech', () => {
    const dataSource = new MatTableDataSource<TechnologyModel>(mockTechData);
    component.technologyDataSource = dataSource;
    component.applyFilterTech();
  })


  it('addNewTechnologyEntry', () => {
    component.TechnologyForm.patchValue({
      technologyName: 'UI',
      domainId: 1

    })
    mocktechService.PostTechData.and.returnValue(of("some response data"));
    spyOn(component, 'getTechnology');
    component.addNewTechnologyEntry();
    expect(component.getTechnology).toHaveBeenCalled();
  })

  it('closeTechnlogyForm', () => {
    spyOn(component, 'getAccounts');
    component.closeTechnlogyForm();
  })


  it('getRegistration', () => {
    mockregistrationService.GetLoginData.and.returnValue(of(mockregistrationData))
    const dataSource = new MatTableDataSource<RegistrationModel>(mockregistrationData);
    component.registrationDataSource = dataSource;

    const data = new MatTableDataSource<RecruiterModel>(mockRecruiterData);
    component.recruiterDataSource = data;

    component.getRegistration();
  })

  it('getLocation', () => {
    mocklocationService.GetAllLocationData.and.returnValue(of(mockLocationData))
    const dataSource = new MatTableDataSource<LocationModel>(mockLocationData);
    component.locationDataSource = dataSource;
    component.getLocation();
  })

  it('getDellManager', () => {
    mockdellManagerService.GetAllDellManagerData.and.returnValue(of(mockDellManagerData))
    const dataSource = new MatTableDataSource<DellManagerModel>(mockDellManagerData);
    component.dellManagerDataSource = dataSource;
    component.getDellManager();
  })

  it('getRecruiter', () => {
    mockrecruiterService.GetAllRecruiterData.and.returnValue(of(mockRecruiterData))
    const dataSource = new MatTableDataSource<RecruiterModel>(mockRecruiterData);
    component.recruiterDataSource = dataSource;
    component.getRecruiter();
  })

  it('getUstPoc', () => {
    mockpocService.GetAllUstPocData.and.returnValue(of(mockUSTPOCData))
    const dataSource = new MatTableDataSource<USTPOCModel>(mockUSTPOCData);
    component.ustPocDataSource = dataSource;
    component.getUstPoc();
  })

  it('getUSTTPM', () => {
    mocktpmService.GetAllUSTTPMData.and.returnValue(of(mockUSTTPMData))
    const dataSource = new MatTableDataSource<USTTPMModel>(mockUSTTPMData);
    component.ustTpmDataSource = dataSource;
    component.getUSTTPM();
  })

  it('getRegion', () => {
    mockregionService.GetAllRegionData.and.returnValue(of(mockRegionData))
    const dataSource = new MatTableDataSource<RegionModel>(mockRegionData);
    component.regionDataSource = dataSource;
    component.getRegion();
  })

  it('updateAccountDetails', () => {
    const data = {
      accountId: 5,
      accountName: "DL-N",
      isEditing: true,
      type: ""
    };
    component.updateAccountDetails(data);
  })

  it('updateRegistrationDetails', () => {

    component.updateRegistrationDetails(mockregistrationData[0]);
  })


  it('updateLocationDetails', () => {
    const data = {
      "isEditing": true,
      "location": "BNG",
      "locationId": 5,
      "regionId": 3,
      "type": ""
    }

    component.updateLocationDetails(data);
  })


  it('saveAccountDetails', () => {
    const data = {
      "accountId": 5,
      "accountName": "DL-N",
      "isEditing": true,
      "type": ""
    }
    mockaccountService.UpdateAccountData.and.returnValue(of("some value"))
    spyOn(component, 'getAccounts');
    component.saveAccountDetails(data);
  })

  it('saveAccountDetails should return error', () => {
    const data = {
      "accountId": 5,
      "accountName": "DL-N",
      "isEditing": true,
      "type": ""
    }
    mockaccountService.UpdateAccountData.and.returnValue(throwError(() => {
      new Error("Error updating Account data")
      spyOn(component, 'getAccounts');

    }))
    component.saveAccountDetails(data);

  })



  it('saveLocationDetails', () => {
    const data = {
      "isEditing": false,
      "location": "BNG",
      "locationId": 6,
      "regionId": 4,
      "type": "update"
    }

    mocklocationService.UpdateLocationData.and.returnValue(of("Location updated successfully success"));
    spyOn(component, "getLocation");
    component.saveLocationDetails(data);

    expect(component.getLocation).toHaveBeenCalled();
  });

  it('saveLocationDetails should return error', () => {
    const data = {
      "isEditing": false,
      "location": "BNG",
      "locationId": 6,
      "regionId": 4,
      "type": "update"
    }

    mocklocationService.UpdateLocationData.and.returnValue(throwError(() => {
      new Error("Error updating Account data")


    }))

    component.saveLocationDetails(data);
  });

  it('saveRegistrationDetails', () => {
    const data = {
      "emailId": "admin@gmail.com",
      "failureAttempts": 0,
      "isEditing": false,
      "isLock": false,
      "loginId": 1,
      "loginName": "Admin",
      "loginPassword": "",
      "roleId": 1,
      "roleName": "Admin",
      "type": "update"
    }


    mockregistrationService.UpdateLoginData.and.returnValue(of("Location updated successfully"));
    spyOn(component, "getRegistration");
    component.saveRegistrationDetails(data);

    expect(component.getRegistration).toHaveBeenCalled();
  });

  it('saveRegistrationDetails should return error', () => {
    const data = {
      "emailId": "admin@gmail.com",
      "failureAttempts": 0,
      "isEditing": false,
      "isLock": false,
      "loginId": 1,
      "loginName": "Admin",
      "loginPassword": "",
      "roleId": 1,
      "roleName": "Admin",
      "type": "update"
    }
    mockregistrationService.UpdateLoginData.and.returnValue(throwError(() => {
      new Error("Error updating Account data")
    }))
    component.saveRegistrationDetails(data);

  });


  it('cancelRegistrationChanges', () => {
    const data = {
      "emailId": "admin@gmail.com",
      "failureAttempts": 0,
      "isEditing": false,
      "isLock": false,
      "loginId": 1,
      "loginName": "Admin",
      "loginPassword": "",
      "roleId": 1,
      "roleName": "Admin",
      "type": ""
    }
    spyOn(component, 'getRegistration');
    component.cancelRegistrationChanges(data);
  })


  it('cancelAccountChanges', () => {
    const data = {
      "accountId": 5,
      "accountName": "DL-N",
      "isEditing": true,
      "type": ""
    }
    spyOn(component, 'getAccounts');
    component.cancelAccountChanges(data);
  })


  it('cancelLocationChanges', () => {
    const data = {
      "emailId": "admin@gmail.com",
      "failureAttempts": 0,
      "isEditing": false,
      "isLock": false,
      "loginId": 1,
      "loginName": "Admin",
      "loginPassword": "",
      "roleId": 1,
      "roleName": "Admin",
      "type": "update"
    }
    spyOn(component, 'getAccounts');
    component.cancelLocationChanges(data);
  })

  it('deleteAccountData', () => {
    const data = {
      "accountId": 5,
      "accountName": "DL-N",
      "isEditing": true,
      "type": ""
    }
    mockaccountService.DeleteAccountData.and.returnValue(of("deleted successfull"));
    spyOn(component, 'getAccounts');
    component.deleteAccountData(data);
  })

  it('deleteRegistrationData', () => {
    const data = {
      "emailId": "admin@gmail.com",
      "failureAttempts": 0,
      "isEditing": false,
      "isLock": false,
      "loginId": 1,
      "loginName": "Admin",
      "loginPassword": "",
      "roleId": 1,
      "roleName": "Admin",
      "type": ""
    }
    mockregistrationService.DeleteLoginData.and.returnValue(of("deleted successfull"));
    spyOn(component, 'getRegistration');
    component.deleteRegistrationData(data);
  })


  it('deleteLocationData', () => {
    const data = {
      "emailId": "admin@gmail.com",
      "failureAttempts": 0,
      "isEditing": false,
      "isLock": false,
      "loginId": 1,
      "loginName": "Admin",
      "loginPassword": "",
      "roleId": 1,
      "roleName": "Admin",
      "type": "update"
    }
    mocklocationService.DeleteLocationData.and.returnValue(of("deleted successfull"));
    spyOn(component, 'getLocation');
    component.deleteLocationData(data);
  })


  it('updateDellManager', () => {

    component.updateDellManager(mockDellManagerData[0]);
  })

  it('deleteDellManagerData', () => {
    mockdellManagerService.DeleteDellManagerData.and.returnValue(of("deleted successfully"));
    spyOn(component, 'getDellManager')
    component.deleteDellManagerData(mockDellManagerData[0]);
    expect(component.getDellManager).toHaveBeenCalled();
  })

  it('saveDellManager', () => {
    mockdellManagerService.UpdateDellManagerData.and.returnValue(of("deleted successfully"));
    spyOn(component, 'getDellManager')
    component.saveDellManager(mockDellManagerData[0]);
    expect(component.getDellManager).toHaveBeenCalled();
  })


  it('saveDellManager should thrown error', () => {
    mockdellManagerService.UpdateDellManagerData.and.returnValue(throwError(() => {
      new Error("Error updating Dell Manager data")
    }
    ))
    component.saveDellManager(mockDellManagerData[0]);

  })

  it('cancelDellManagerChanges', () => {
    spyOn(component, 'getDellManager')
    component.cancelDellManagerChanges(mockDellManagerData[0]);

  })

  it('updateRegion', () => {

    component.updateRegion(mockRegionData[0]);

  })

  it('deleteRegionData', () => {
    mockregionService.DeleteRegionData.and.returnValue(of("deleted successfully"));
    spyOn(component, 'getRegion');
    component.deleteRegionData(mockRegionData[0]);

  })

  it('saveRegion', () => {
    mockregionService.UpdateRegionData.and.returnValue(of("deleted successfully"));
    spyOn(component, 'getRegion');
    component.saveRegion(mockRegionData[0]);
  })

  it('saveRegion should return error', () => {
    mockregionService.UpdateRegionData.and.returnValue(throwError(() => {
      new Error('Error updating Region data')
    }))

    component.saveRegion(mockRegionData[0]);
  })

  it('cancelRecruiterChanges', () => {
    spyOn(component, 'getRegion')

    component.cancelRecruiterChanges(mockRecruiterData[0]);
  })

  it('updateRecruiter', () => {

    component.updateRecruiter(mockRecruiterData[0]);
  })

  it('deleteRecruiterData', () => {
    mockrecruiterService.DeleteRecruiterData.and.returnValue(of("successfully deleted"));
    spyOn(component, 'getRecruiter')
    component.deleteRecruiterData(mockRecruiterData[0]);
  })

  it('saveRecruiter', () => {
    mockrecruiterService.UpdateRecruiterData.and.returnValue(of("successfully deleted"));
    spyOn(component, 'getRecruiter')
    component.saveRecruiter(mockRecruiterData[0]);
  })

  it('saveRecruiter should thrown error', () => {
    mockrecruiterService.UpdateRecruiterData.and.returnValue(throwError(() => {
      new Error('Error updating Recruiter data')
    }))

    component.saveRecruiter(mockRecruiterData[0]);
  })

  it('cancelRegionChanges', () => {

    spyOn(component, 'getRecruiter')
    component.cancelRegionChanges(mockRegionData[0]);
  })

  it('updateUSTPOC', () => {

    spyOn(component, 'getRecruiter')
    component.updateUSTPOC(mockUSTPOCData[0]);
  })

  it('deleteUSTPOCData', () => {
    mockpocService.DeleteUstPocData.and.returnValue(of('successfully deleted'))
    spyOn(component, 'getUstPoc')
    component.deleteUSTPOCData(mockUSTPOCData[0]);
  })
  it('saveUSTPOC', () => {
    mockpocService.UpdateUstPocData.and.returnValue(of('successfully deleted'))
    spyOn(component, 'getUstPoc')
    component.saveUSTPOC(mockUSTPOCData[0]);
  })

  it('saveUSTPOC should thrown error', () => {
    mockpocService.UpdateUstPocData.and.returnValue(throwError(() => {
      new Error('Error updating USTPOC data')
    }))
    component.saveUSTPOC(mockUSTPOCData[0]);
  })

  it('cancelUSTPOC', () => {
    spyOn(component, 'getUstPoc')
    component.cancelUSTPOC(mockUSTPOCData[0]);
  })

  it('updateUSTTPM', () => {
    spyOn(component, 'getUstPoc')
    component.updateUSTTPM(mockUSTTPMData[0]);
  })

  it('deleteUSTTPMData', () => {
    mocktpmService.DeleteUSTTPMData.and.returnValue(of(mockUSTTPMData[0]))
    spyOn(component, 'getUSTTPM')
    component.deleteUSTTPMData(mockUSTTPMData[0]);
  })

  it('saveUSTTPM', () => {
    mocktpmService.UpdateUSTTPMData.and.returnValue(of(mockUSTTPMData[0]))
    spyOn(component, 'getUSTTPM')
    component.saveUSTTPM(mockUSTTPMData[0]);
  })
  it('saveUSTTPM should thrown error', () => {
    mocktpmService.UpdateUSTTPMData.and.returnValue(throwError(() => {
      new Error('Error updating USTTPM data')
    }))

    component.saveUSTTPM(mockUSTTPMData[0]);
  })

  it('cancelUSTTPM', () => {

    spyOn(component, 'getUSTTPM')
    component.cancelUSTTPM(mockUSTTPMData[0]);
  })

  it('updateDomain', () => {

    component.updateDomain(mockDomainData[0]);
  })




  it('cancelDomain', () => {

    spyOn(component, 'getDomain')
    component.cancelDomain(mockDomainData[0]);
  })


  it('openTechnologyForm', () => {
    component.openTechnologyForm();
  })
  it('openRegistrationForm', () => {
    component.openRegistrationForm();
  })
  it('openAccountForm', () => {
    component.openAccountForm();
  })
  it('openTechnologyForm', () => {
    component.openTechnologyForm();
  })
  it('openDellManagerForm', () => {
    component.openDellManagerForm();
  })
  it('openRecruiterForm', () => {
    component.openRecruiterForm();
  })
  it('openUSTPOCForm', () => {
    component.openUSTPOCForm();
  })
  it('openUSTTPMForm', () => {
    component.openUSTTPMForm();
  })
  it('openRegionForm', () => {
    component.openRegionForm();
  })
  it('openDomainForm', () => {
    component.openDomainForm();
  })
  it('openLocationForm', () => {
    component.openLocationForm();
  })
  it('closeAccountForm', () => {
    component.closeAccountForm();
  })
  it('closeRegistrationForm', () => {
    component.closeRegistrationForm();
  })
  it('closeLocationForm', () => {
    component.closeLocationForm();
  })
  it('closeRegionForm', () => {
    component.closeRegionForm();
  })
  it('closeDomainForm', () => {
    component.closeDomainForm();
  })

  it('closeRecruiterForm', () => {
    component.closeRecruiterForm();
  })
  it('closeUSTPOCForm', () => {
    component.closeUSTPOCForm();
  })

  it('closeUSTTPMForm', () => {
    component.closeUSTTPMForm();
  })
  it('closeDellManagerForm', () => {
    component.closeDellManagerForm();
  })

  it('onRoleSelectionChange', () => {

    const rolename = "DM";
    component.onRoleSelectionChange(rolename);
  })

  it('resetAccount', () => {

    mockloginService.UpdateIsLock.and.returnValue(of("Reset Successful"));
    spyOn(component, 'getRegistration');
    component.resetAccount(mockregistrationData[0]);
  })

  it('resetAccount should thrown error', () => {

    mockloginService.UpdateIsLock.and.returnValue(throwError(() => {
      new Error('Error updating Account data');
    }))

    component.resetAccount(mockregistrationData[0]);
  })

  it('addNewAccountEntry', () => {
    component.AccountForm.patchValue(
      {
        accountName: "DL-MM"
      }
    )

    mockaccountService.PostAccountData.and.returnValue(of("Added Successful"));
    spyOn(component, 'getAccounts');
    component.addNewAccountEntry();
  })


  it('addNewLocationEntry', () => {
    component.AccountForm.patchValue(
      {
        accountName: "DL-MM"
      }
    )
    mocklocationService.PostLocationData.and.returnValue(of("Added Successful"));
    spyOn(component, 'getLocation');
    component.addNewLocationEntry();
  })



  it('addNewRegistrationEntry', () => {
    component.RegistrationForm.patchValue(
      {
        emailId: "nandini@gmail.com",
        loginName: "Nandini",
        role: "1"
      }
    )
    mockregistrationService.PostRegistrationData.and.returnValue(of("Added Successful"));
    spyOn(component, 'getRegistration');
    spyOn(component, 'closeRegistrationForm');
    component.addNewRegistrationEntry();
  })


  it('addNewDellMangerEntry', () => {
    component.DellManagerForm.patchValue(
      {
        dellManagerName: "Nandini"
      }
    )
    mockdellManagerService.PostDellManagerData.and.returnValue(of("Added Successful"));
    spyOn(component, 'getDellManager');
    spyOn(component, 'closeDellManagerForm');
    component.addNewDellMangerEntry();
  })



  it('addNewRegionEntry', () => {
    component.RegionForm.patchValue(
      {
        region: "US"
      }
    )
    mockregionService.PostRegionData.and.returnValue(of("Added Successful"));
    spyOn(component, 'getRegion');
    spyOn(component, 'closeRegionForm');
    component.addNewRegionEntry();
  })


  it('addNewUSTPOCEntry', () => {
    component.USTPOCForm.patchValue(
      {
        ustpocName: "Bharath"
      }
    )
    mockpocService.PostUstPocData.and.returnValue(of("Added Successful"));
    spyOn(component, 'getUstPoc');
    spyOn(component, 'closeUSTPOCForm');
    component.addNewUSTPOCEntry();
  })

  it('addNewUSTTPMEntry', () => {
    component.USTTPMForm.patchValue(
      {
        usttpmName: "Bharath"
      }
    )
    mocktpmService.PostUSTTPMData.and.returnValue(of("Added Successful"));
    spyOn(component, 'getUSTTPM');
    spyOn(component, 'closeUSTTPMForm');
    component.addNewUSTTPMEntry();
  })

  it('addNewRecruiterEntry', () => {
    component.RecruiterForm.patchValue(
      {
        recruiterName: "Bharath"
      }
    )
    mockrecruiterService.PostRecruiterData.and.returnValue(of("Added Successful"));
    spyOn(component, 'getRecruiter');
    spyOn(component, 'closeRecruiterForm');
    component.addNewRecruiterEntry();
  })




});
