import { RegistrationService } from './../shared/Services/RegistrationService/registration.service';
import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';
import { UstPocService } from './../shared/Services/UstpocService/ust-poc.service';
import { DellManagerModel } from 'src/app/Models/DellManagerModel';
import { Component, OnInit, ViewChild, inject, AfterViewInit, } from '@angular/core';
import { AccountModel } from '../Models/AccountModel';
import { AccountService } from '../shared/Services/AccountService/account.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../shared/Services/admin.service';
import { RegionModel } from '../Models/RegionModel';
import { RecruiterModel } from '../Models/RecruiterModel';
import { USTTPMModel } from '../Models/USTTPMModel';
import { LocationModel } from '../Models/LocationModel';
import { USTPOCModel } from '../Models/USTPOCModel';
import { TechnologyModel } from '../Models/TechnologyModel';
import { RegionService } from '../shared/Services/RegionService/region.service';
import { LocationService } from '../shared/Services/LocationService/location.service';
import { UstTpmService } from '../shared/Services/UsttpmService/ust-tpm.service';
import { RecruiterService } from '../shared/Services/RecruiterService/recruiter.service';
import { DellManagerService } from '../shared/Services/DellManagerService/dell-manager.service';
import { TechnologyService } from '../shared/Services/TechnologyService/technology.service';
import { DomainModel } from '../Models/DomainModel';
import { DomainService } from '../shared/Services/DomainService/domain.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { RegistrationModel } from '../Models/RegistrationModel';
import { LoginService } from '../shared/Services/LoginService/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  selectedTab: string;
  searchTechnology: string = '';
  showAccountForm: boolean = false;
  showDellManagerForm: boolean = false;
  showDomainForm: boolean = false;
  showRegionForm: boolean = false;
  showRecruiterForm: boolean = false;
  showUSTPOCForm: boolean = false;
  showUSTTPMForm: boolean = false;
  showLocationForm: boolean = false;
  showRegistrationForm: boolean = false;

  searchAccount: string = '';
  searchDellManager: string = '';
  searchDomain: string = '';
  searchLocation: string = '';
  searchRecruiter: string = '';
  searchRegion: string = '';
  searchUSTPOC: string = '';
  searchUSTTPM: string = '';
  searchRegistration: string = '';
  selectedDomainId: number;
  selectedRole: any;
  selectedRegionId: number;
  accountDataSource: MatTableDataSource<AccountModel>;
  dellManagerDataSource: MatTableDataSource<DellManagerModel>;
  recruiterDataSource: MatTableDataSource<RecruiterModel>;
  ustPocDataSource: MatTableDataSource<USTPOCModel>;
  ustTpmDataSource: MatTableDataSource<USTTPMModel>;
  regionDataSource: MatTableDataSource<RegionModel>;
  domainDataSource: MatTableDataSource<DomainModel>;
  locationDataSource: MatTableDataSource<LocationModel>;
  registrationDataSource: MatTableDataSource<RegistrationModel>;
  technologyDataSource: MatTableDataSource<TechnologyModel>;
  @ViewChild('registrationPaginator') registrationPaginator: MatPaginator;
  @ViewChild('locationPaginator') locationPaginator: MatPaginator;
  @ViewChild('accountPaginator') accountPaginator: MatPaginator;
  @ViewChild('dellManagerPaginator') dellManagerPaginator: MatPaginator;
  @ViewChild('regionPaginator') regionPaginator: MatPaginator;
  @ViewChild('recruiterPaginator') recruiterPaginator: MatPaginator;
  @ViewChild('ustPocPaginator') ustPocPaginator: MatPaginator;
  @ViewChild('ustTpmPaginator') ustTpmPaginator: MatPaginator;
  @ViewChild('domainPaginator') domainPaginator: MatPaginator;
  @ViewChild('technologyPaginator') technologyPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  roleName: any;

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private regionService: RegionService,
    private locationService: LocationService,
    private domainService: DomainService,
    private tpmService: UstTpmService,
    private pocService: UstPocService,
    private recruiterService: RecruiterService,
    private dellManagerService: DellManagerService,
    private techService: TechnologyService,
    private excelService: ExcelService,
    private registrationService: RegistrationService,
    private loginService: LoginService
  ) {
    this.selectedTab = 'Candidate';
  }

  Candidate: boolean = false;
  SO: boolean = false;
  Account: boolean = false;
  DellManager: boolean = false;
  Domain: boolean = false;
  Location: boolean = false;
  Registration: boolean = false;
  Region: boolean = false;
  Recruiter: boolean = false;
  Technology: boolean = false;
  USTPOC: boolean = false;
  USTTPM: boolean = false;


  ngOnInit(): void {
    this.getAccounts();
    this.getRoles();
    this.getDomain();
    this.TabLevelAccess();
  }

  TabLevelAccess() {
    let data = sessionStorage.getItem("userData");
    let resData = data ? JSON.parse(data) : null;
    let TabNames = resData.TabNames.split(",");
    console.log( "hi",TabNames)
    for (let i = 0; i < TabNames.length; i++) 
    {
      if (TabNames[i].toLowerCase() == "candidate") {

        this.Candidate = true;
      }
      else if (TabNames[i].toLowerCase() == "so") {
        this.SO = true;
      }
      else if (TabNames[i].toLowerCase() == "account") {
        this.Account = true;
      }
      else if (TabNames[i].toLowerCase() == "dellmanager") {
        this.DellManager = true;
      }
      else if (TabNames[i].toLowerCase() == "domain") {
        this.Domain = true;
      }
      else if (TabNames[i].toLowerCase() == "location") {
        this.Location = true;
      }
      else if (TabNames[i].toLowerCase() == "registration") {
        this.Registration = true;
      }
      else if (TabNames[i].toLowerCase() == "region") {
        this.Region = true;
      }
      else if (TabNames[i].toLowerCase() == "recruiter") {
        this.Recruiter = true;
      }
      else if (TabNames[i].toLowerCase() == "technology") {
        this.Technology = true;
      }
      else if (TabNames[i].toLowerCase() == "ustpoc") {
        this.USTPOC = true;
      }
      else if (TabNames[i].toLowerCase() == "usttpm") {
        this.USTTPM = true;
      }

    }
  }



  onTabChange(event: MatTabChangeEvent): void {

    this.selectedTab = event.tab.textLabel;

    if (this.selectedTab === 'Registration') {
      this.getRegistration();
      this.closeLocationForm();
      this.closeAccountForm();
      this.closeRegionForm();
      this.closeDomainForm();
      this.closeRecruiterForm();
      this.closeUSTPOCForm();
      this.closeUSTTPMForm();
      this.closeDellManagerForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchDellManager = '';
      this.searchDomain = '';
      this.searchLocation = '';
      this.searchRecruiter = '';
      this.searchRegion = '';
      this.searchUSTPOC = '';
      this.searchUSTTPM = '';
      this.searchAccount = '';

    }

    if (this.selectedTab === 'Account') {
      this.getAccounts();
      this.closeLocationForm();
      this.closeRegionForm();
      this.closeDomainForm();
      this.closeRecruiterForm();
      this.closeUSTPOCForm();
      this.closeUSTTPMForm();
      this.closeDellManagerForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchDellManager = '';
      this.searchDomain = '';
      this.searchLocation = '';
      this.searchRecruiter = '';
      this.searchRegion = '';
      this.searchUSTPOC = '';
      this.searchUSTTPM = '';

    }
    if (this.selectedTab === 'DellManager') {
      this.getDellManager();
      this.closeLocationForm();
      this.closeRegionForm();
      this.closeDomainForm();
      this.closeRecruiterForm();
      this.closeUSTPOCForm();
      this.closeUSTTPMForm();
      this.closeAccountForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchAccount = '';
      this.searchDomain = '';
      this.searchLocation = '';
      this.searchRecruiter = '';
      this.searchRegion = '';
      this.searchUSTPOC = '';
      this.searchUSTTPM = '';


    }
    if (this.selectedTab === 'Domain') {
      this.getDomain();
      this.closeLocationForm();
      this.closeRegionForm();
      this.closeDellManagerForm();
      this.closeRecruiterForm();
      this.closeUSTPOCForm();
      this.closeUSTTPMForm();
      this.closeAccountForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchAccount = '';
      this.searchDellManager = '';
      this.searchLocation = '';
      this.searchRecruiter = '';
      this.searchRegion = '';
      this.searchUSTPOC = '';
      this.searchUSTTPM = '';

    }

    if (this.selectedTab === 'Recruiter') {
      this.getRecruiter();
      this.closeLocationForm();
      this.closeRegionForm();
      this.closeDellManagerForm();
      this.closeDomainForm();
      this.closeUSTPOCForm();
      this.closeUSTTPMForm();
      this.closeAccountForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchAccount = '';
      this.searchDellManager = '';
      this.searchDomain = '';
      this.searchLocation = '';
      this.searchRegion = '';
      this.searchUSTPOC = '';
      this.searchUSTTPM = '';

    }
    if (this.selectedTab === 'USTTPM') {
      this.getUSTTPM();
      this.closeLocationForm();
      this.closeRegionForm();
      this.closeDellManagerForm();
      this.closeDomainForm();
      this.closeUSTPOCForm();
      this.closeRecruiterForm();
      this.closeAccountForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchAccount = '';
      this.searchDellManager = '';
      this.searchDomain = '';
      this.searchLocation = '';
      this.searchRecruiter = '';
      this.searchRegion = '';
      this.searchUSTPOC = '';

    }
    if (this.selectedTab === 'USTPOC') {
      this.getUstPoc();

      this.closeLocationForm();
      this.closeRegionForm();
      this.closeDellManagerForm();
      this.closeDomainForm();
      this.closeUSTTPMForm();
      this.closeRecruiterForm();
      this.closeAccountForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchAccount = '';
      this.searchDellManager = '';
      this.searchDomain = '';
      this.searchLocation = '';
      this.searchRecruiter = '';
      this.searchRegion = '';
      this.searchUSTTPM = '';

    }

    if (this.selectedTab === 'Region') {
      this.getRegion();
      this.closeLocationForm();
      this.closeUSTPOCForm();
      this.closeDellManagerForm();
      this.closeDomainForm();
      this.closeUSTTPMForm();
      this.closeRecruiterForm();
      this.closeAccountForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchAccount = '';
      this.searchDellManager = '';
      this.searchDomain = '';
      this.searchLocation = '';
      this.searchRecruiter = '';
      this.searchUSTPOC = '';
      this.searchUSTTPM = '';

    }
    if (this.selectedTab === 'Location') {
      this.getRegion();
      this.getLocation();
      this.closeRegionForm();
      this.closeUSTPOCForm();
      this.closeDellManagerForm();
      this.closeDomainForm();
      this.closeUSTTPMForm();
      this.closeRecruiterForm();
      this.closeAccountForm();
      this.closeTechnlogyForm();
      this.searchTechnology = '';
      this.searchAccount = '';
      this.searchDellManager = '';
      this.searchDomain = '';
      this.searchRecruiter = '';
      this.searchRegion = '';
      this.searchUSTPOC = '';
      this.searchUSTTPM = '';

    }
    if (this.selectedTab === 'Technology') {

      this.getTechnology();
      this.closeRegionForm();
      this.closeUSTPOCForm();
      this.closeDellManagerForm();
      this.closeDomainForm();
      this.closeUSTTPMForm();
      this.closeRecruiterForm();
      this.closeAccountForm();
      this.closeLocationForm();
      this.searchAccount = '';
      this.searchLocation = '';
      this.searchDellManager = '';
      this.searchDomain = '';
      this.searchRecruiter = '';
      this.searchRegion = '';
      this.searchUSTPOC = '';
      this.searchUSTTPM = '';

    }
  }
  getTechnology(): void {

    this.techService.GetAllTechData().subscribe((result) => {

      console.log(result)
      this.technologyDataSource = new MatTableDataSource<TechnologyModel>(result);

      this.technologyDataSource.paginator = this.technologyPaginator;

      this.technologyDataSource.sort = this.sort;




    });

  }
  saveTechnology(row: any) {
    row.type = 'update';
    this.techService.UpdateTechData(row.technologyId, row).subscribe(
      (response) => {
        alert(response)
        row.isEditing = false;
        this.getTechnology();
      },
      (error) => {
        console.error('Error updating Technology data', error);
      }
    );
  }
  updateTechnology(row: TechnologyModel): void {

    row.isEditing = !row.isEditing;

  }
  cancelTechnologyChanges(row: any) {

    row.isEditing = false;

    this.getTechnology();

  }
  deleteTechnologyData(data: any) {
    console.log(data)
    this.techService.DeleteTechData(data.technologyId).subscribe((res) => {
      alert(res)
      this.getTechnology();

    });

  }
  getRegionName(regionId: number): string {
    if (!this.regionDataSource) {
      return '';
    }
    const region = this.regionDataSource.data.find(
      (r) => r.regionId === regionId
    );
    if (!region) {
      return '';
    }
    return region.region;
  }

  applyFilterAccount(): void {
    this.accountDataSource.filter = this.searchAccount.trim().toLowerCase();
  }



  applyFilterDellManager(): void {
    this.dellManagerDataSource.filter = this.searchDellManager.trim().toLowerCase();
  }
  applyFilterDomain(): void {
    this.domainDataSource.filter = this.searchDomain.trim().toLowerCase();
  }
  applyFilterLocation(): void {
    this.locationDataSource.filter = this.searchLocation.trim().toLowerCase();
  }
  applyFilterRegistration(): void {
    this.registrationDataSource.filter = this.searchRegistration.trim().toLowerCase();
  }

  applyFilterRegion(): void {
    this.regionDataSource.filter = this.searchRegion.trim().toLowerCase();
  }

  applyFilterRecruiter(): void {
    this.recruiterDataSource.filter = this.searchRecruiter.trim().toLowerCase();
  }
  applyFilterUSTPOC(): void {
    this.ustPocDataSource.filter = this.searchUSTPOC.trim().toLowerCase();
  }
  applyFilterUSTTPM(): void {
    this.ustTpmDataSource.filter = this.searchUSTTPM.trim().toLowerCase();
  }
  getDomainName(domainId: number): string {
    console.log("hello", !this.domainDataSource)
    if (!this.domainDataSource) {

      return '';

    }

    const domain = this.domainDataSource.data.find(

      (r) => r.domainId === domainId


    );
    console.log(domain)

    if (!domain) {

      return '';

    }

    return domain.domainName;

  }

  openTechnologyForm(): void {

    this.showAddForm = !this.showAddForm

  }

  applyFilterTech(): void {

    this.technologyDataSource.filter = this.searchTechnology.trim().toLowerCase();

  }

  showAddForm: boolean = false;


  addNewTechnologyEntry(): void {
    let formValue = this.TechnologyForm.value;

    let obj = {

      technologyName: formValue.technologyName,
      domainId: formValue.domainId,
      type: "post",

    };

    this.techService.PostTechData(obj).subscribe((data) => {
      this.getTechnology();
      this.openSnackBar(data, 'ok')
      this.TechnologyForm.reset();
    });

    this.closeTechnlogyForm();

  }

  closeTechnlogyForm(): void {

    this.showAddForm = false;

    this.getAccounts();

  }
  getAccounts(): void {
    this.accountService.GetAllAccountData().subscribe((result) => {
      console.log(result)
      this.accountDataSource = new MatTableDataSource<AccountModel>(result);
      this.accountDataSource.paginator = this.accountPaginator;
      this.accountDataSource.sort = this.sort;
    });
  }

  getRegistration(): void {
    this.registrationService.GetLoginData().subscribe((result) => {
      this.registrationDataSource = new MatTableDataSource<RegistrationModel>(result);
      this.registrationDataSource.paginator = this.registrationPaginator;
      this.recruiterDataSource.sort = this.sort;
    })
  }

  getLocation(): void {
    this.locationService.GetAllLocationData().subscribe((result) => {
      this.locationDataSource = new MatTableDataSource<LocationModel>(result);
      this.locationDataSource.paginator = this.locationPaginator;
      this.locationDataSource.sort = this.sort;
    });
  }

  getDellManager(): void {
    this.dellManagerService.GetAllDellManagerData().subscribe((result) => {
      this.dellManagerDataSource = new MatTableDataSource<DellManagerModel>(
        result
      );
      this.dellManagerDataSource.paginator = this.dellManagerPaginator;
      this.dellManagerDataSource.sort = this.sort;
    });
  }
  getRecruiter(): void {
    this.recruiterService.GetAllRecruiterData().subscribe((result) => {
      this.recruiterDataSource = new MatTableDataSource<RecruiterModel>(result);
      this.recruiterDataSource.paginator = this.recruiterPaginator;
      this.recruiterDataSource.sort = this.sort;
    });
  }

  getUstPoc(): void {
    this.pocService.GetAllUstPocData().subscribe((result) => {
      this.ustPocDataSource = new MatTableDataSource<USTPOCModel>(result);
      this.ustPocDataSource.paginator = this.ustPocPaginator;
      this.ustPocDataSource.sort = this.sort;
    });
  }

  getUSTTPM(): void {
    this.tpmService.GetAllUSTTPMData().subscribe((result) => {
      this.ustTpmDataSource = new MatTableDataSource<USTTPMModel>(result);
      this.ustTpmDataSource.paginator = this.ustTpmPaginator;
      this.ustTpmDataSource.sort = this.sort;
    });
  }

  getRegion(): void {
    this.regionService.GetAllRegionData().subscribe((result) => {

      this.regionDataSource = new MatTableDataSource<RegionModel>(result);
      this.regionDataSource.paginator = this.regionPaginator;
      this.regionDataSource.sort = this.sort;
      console.log(result)
    });
  }

  getDomain(): void {
    this.domainService.GetAllDomainData().subscribe((result) => {
      this.domainDataSource = new MatTableDataSource<DomainModel>(result);
      this.domainDataSource.paginator = this.domainPaginator;
      this.domainDataSource.sort = this.sort;
    });
  }

  updateAccountDetails(row: AccountModel): void {

    row.isEditing = !row.isEditing;
  }

  updateRegistrationDetails(row: RegistrationModel): void {
    row.isEditing = !row.isEditing;
  }


  updateLocationDetails(row: LocationModel): void {

    row.isEditing = !row.isEditing;
  }

  saveAccountDetails(row: any): void {

    (row.type = 'update'),
      this.accountService.UpdateAccountData(row.accountId, row).subscribe(
        (response) => {
          alert(response);
          row.isEditing = false;
          this.getAccounts();
        },
        (error) => {
          console.error('Error updating Account data', error);
        }
      );
  }


  saveLocationDetails(row: any): void {
    console.log(row)
    row.type = 'update';
    this.locationService.UpdateLocationData(row.locationId, row).subscribe(
      (response) => {
        alert(response)
        // console.log('Location updated successfully', response);
        row.isEditing = false;
        this.getLocation();
      },
      (error) => {
        console.error('Error updating Account data', error);
      }
    );
  }

  saveRegistrationDetails(row: any): void {
    console.log(row)
    row.type = 'update';
    this.registrationService.UpdateLoginData(row.loginId, row).subscribe(
      (response) => {
        alert(response)
        console.log('Location updated successfully', response);
        row.isEditing = false;
        this.getRegistration();
      },
      (error) => {
        console.error('Error updating Account data', error);
      }
    );
  }

  cancelRegistrationChanges(row: any): void {
    console.log(row)
    row.isEditing = false;
    this.getRegistration();
  }
  cancelAccountChanges(row: any): void {
    row.isEditing = false;
    this.getAccounts();
  }

  cancelLocationChanges(row: any): void {
    row.isEditing = false;
    this.getLocation();
  }

  deleteAccountData(data: any) {
    this.accountService.DeleteAccountData(data.accountId).subscribe((res) => {
      alert(res)
      this.getAccounts();
    });
  }

  deleteRegistrationData(data: any) {
    this.registrationService.DeleteLoginData(data.loginId).subscribe((res) => {
      alert(res)
      this.getRegistration();
    });
  }

  deleteLocationData(data: any) {
    this.locationService
      .DeleteLocationData(data.locationId)
      .subscribe((res) => {
        alert(res)

        this.getLocation();
      });
  }

  updateDellManager(row: DellManagerModel): void {
    row.isEditing = !row.isEditing;
  }
  deleteDellManagerData(data: any) {
    this.dellManagerService
      .DeleteDellManagerData(data.dellManagerId)
      .subscribe((res) => {
        alert(res)
        this.getDellManager();
      });
  }
  saveDellManager(row: any) {
    (row.type = 'update'),
      this.dellManagerService
        .UpdateDellManagerData(row.dellManagerId, row)
        .subscribe(
          (response) => {
            alert(response)
            row.isEditing = false;
            this.getDellManager();
          },
          (error) => {
            console.error('Error updating Dell Manager data', error);
          }
        );
  }

  cancelDellManagerChanges(row: any) {
    row.isEditing = false;
    this.getDellManager();
  }

  updateRegion(row: RegionModel): void {
    row.isEditing = !row.isEditing;
  }
  deleteRegionData(data: any) {
    this.regionService.DeleteRegionData(data.regionId).subscribe((res) => {
      alert(res)
      this.getRegion();

    });
  }
  saveRegion(row: any) {
    (row.type = 'update'),
      this.regionService.UpdateRegionData(row.regionId, row).subscribe(
        (response) => {
          alert(response)
          row.isEditing = false;
          this.getRegion();
        },
        (error) => {
          console.error('Error updating Region data', error);
        }
      );
  }

  cancelRecruiterChanges(row: any) {
    row.isEditing = false;
    this.getRegion();
  }

  updateRecruiter(row: RecruiterModel): void {
    row.isEditing = !row.isEditing;
  }
  deleteRecruiterData(data: any) {
    this.recruiterService
      .DeleteRecruiterData(data.recruiterId)
      .subscribe((res) => {
        alert(res)
        this.getRecruiter();
      });
  }
  saveRecruiter(row: any) {
    (row.type = 'update'),
      this.recruiterService.UpdateRecruiterData(row.recruiterId, row).subscribe(
        (response) => {
          alert(response)
          row.isEditing = false;
          this.getRecruiter();
        },
        (error) => {
          console.error('Error updating Recruiter data', error);
        }
      );
  }

  cancelRegionChanges(row: any) {
    row.isEditing = false;
    this.getRecruiter();
  }

  updateUSTPOC(row: USTPOCModel): void {
    row.isEditing = !row.isEditing;
  }
  deleteUSTPOCData(data: any) {
    this.pocService.DeleteUstPocData(data.ustpocId).subscribe((res) => {
      this.getUstPoc();
    });
  }
  saveUSTPOC(row: any) {
    (row.type = 'update'),
      this.pocService.UpdateUstPocData(row.ustpocId, row).subscribe(
        (response) => {
          row.isEditing = false;
          this.getUstPoc();
        },
        (error) => {
          console.error('Error updating USTPOC data', error);
        }
      );
  }

  cancelUSTPOC(row: any) {
    row.isEditing = false;
    this.getUstPoc();
  }

  updateUSTTPM(row: USTTPMModel): void {
    row.isEditing = !row.isEditing;
  }
  deleteUSTTPMData(data: any) {
    this.tpmService.DeleteUSTTPMData(data.usttpmId).subscribe((res) => {
      this.getUSTTPM();
      alert(res)
    });
  }
  saveUSTTPM(row: any) {
    (row.type = 'update'),
      this.tpmService.UpdateUSTTPMData(row.usttpmId, row).subscribe(
        (response) => {
          row.isEditing = false;
          this.getUSTTPM();
          alert(response)
        },
        (error) => {
          console.error('Error updating USTTPM data', error);
        }
      );
  }

  cancelUSTTPM(row: any) {
    row.isEditing = false;
    this.getUSTTPM();
  }

  updateDomain(row: DomainModel): void {
    row.isEditing = !row.isEditing;
  }
  deleteDomainData(data: any) {
    console.log("hi")
    this.domainService.DeleteDomainData(data.domainId).subscribe((res) => {
      alert(res)
      this.getDomain();
    });
  }
  saveDomain(row: any) {
    (row.type = 'update'),
      this.domainService.UpdateDomainData(row.domainId, row).subscribe(
        (response) => {
          alert(response)
          row.isEditing = false;
          this.getDomain();
        },
        (error) => {
          console.error('Error updating Domain data', error);
        }
      );
  }

  cancelDomain(row: any) {
    row.isEditing = false;
    this.getDomain();
  }

  openRegistrationForm(): void {
    this.showRegistrationForm = !this.showRegistrationForm;
  }

  openAccountForm(): void {
    this.showAccountForm = !this.showAccountForm;
  }
  openDellManagerForm(): void {
    this.showDellManagerForm = !this.showDellManagerForm;
  }
  openRecruiterForm(): void {
    this.showRecruiterForm = !this.showRecruiterForm;
  }
  openUSTPOCForm(): void {
    this.showUSTPOCForm = !this.showUSTPOCForm;
  }

  openUSTTPMForm(): void {
    this.showUSTTPMForm = !this.showUSTTPMForm;
  }
  openRegionForm(): void {
    this.showRegionForm = !this.showRegionForm;
  }
  openDomainForm(): void {
    this.showDomainForm = !this.showDomainForm;
  }
  openLocationForm(): void {
    this.showLocationForm = !this.showLocationForm;
  }

  closeAccountForm(): void {
    this.showAccountForm = false;
  }

  closeRegistrationForm(): void {
    this.showRegistrationForm = false;
  }

  closeLocationForm(): void {
    this.showLocationForm = false;
  }
  closeRegionForm(): void {
    this.showRegionForm = false;
  }

  closeDomainForm(): void {
    this.showDomainForm = false;
  }

  closeRecruiterForm(): void {
    this.showRecruiterForm = false;
  }

  closeUSTPOCForm(): void {
    this.showUSTPOCForm = false;
  }
  closeUSTTPMForm(): void {
    this.showUSTTPMForm = false;
  }

  closeDellManagerForm(): void {
    this.showDellManagerForm = false;
  }

  private fb = inject(FormBuilder);

  AccountForm = this.fb.group({
    accountName: ['', Validators.required],
  });

  addNewAccountEntry(): void {
    console.log(this.AccountForm.value)
    let formValue = this.AccountForm.value;
    let obj = {
      accountName: formValue.accountName,
      type: 'post',
    };
    this.accountService.PostAccountData(obj).subscribe((data) => {
      this.getAccounts();
      this.openSnackBar(data, 'ok');
      this.AccountForm.reset();
    });
    this.closeAccountForm();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  LocationForm = this.fb.group({
    location: ['', Validators.required],
    regionId: ['', Validators.required],
  });

  addNewLocationEntry(): void {
    console.log(this.LocationForm.value)
    let formValue = this.LocationForm.value;
    let obj = {
      location: formValue.location,
      regionId: formValue.regionId,
      type: 'post',
    };
    this.locationService.PostLocationData(obj).subscribe((data) => {
      this.getLocation();
      this.openSnackBar(data, 'ok')
      this.LocationForm.reset();
    });
    this.closeLocationForm();
  }

  RegistrationForm = this.fb.group({
    loginName: ['', Validators.required],
    emailId: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
  });

  TechnologyForm = this.fb.group({

    technologyName: ['', Validators.required],

    domainId: [0, Validators.required],

  });


  addNewRegistrationEntry(): void {

    let formValue = this.RegistrationForm.value;
    let obj = {
      loginName: formValue.loginName,
      emailId: formValue.emailId,
      roleId: formValue.role,
      type: 'post',
    };
    this.registrationService.PostRegistrationData(obj).subscribe((data) => {
      this.getRegistration();
      this.openSnackBar(data, 'ok')
      this.RegistrationForm.reset();
      console.log(obj)
    });
    this.closeRegistrationForm();
  }


  DellManagerForm = this.fb.group({
    dellManagerName: ['', Validators.required],
  });

  addNewDellMangerEntry(): void {
    let formValue = this.DellManagerForm.value;
    let obj = {
      dellManagerName: formValue.dellManagerName,
      type: 'post',
    };
    this.dellManagerService.PostDellManagerData(obj).subscribe((data) => {
      this.getDellManager();
      this.openSnackBar(data, 'ok')
      this.DellManagerForm.reset();
    });
    this.closeDellManagerForm();
  }
  DomainForm = this.fb.group({
    domainName: ['', Validators.required],
  });

  addNewDomainEntry(): void {
    let formValue = this.DomainForm.value;
    let obj = {
      domainName: formValue.domainName,
      type: 'post',
    };
    this.domainService.PostDomainData(obj).subscribe((data) => {
      this.getDomain();
      this.openSnackBar(data, 'ok')
      this.DomainForm.reset();
    });
    this.closeDomainForm();
  }

  RegionForm = this.fb.group({
    region: ['', Validators.required],
  });

  addNewRegionEntry(): void {

    let formValue = this.RegionForm.value;
    let obj = {
      region: formValue.region,
      type: 'post',
    };
    this.regionService.PostRegionData(obj).subscribe((data) => {
      this.getRegion();
      this.openSnackBar(data, 'ok');
      this.RegionForm.reset();
    });
    this.closeRegionForm();
  }

  RecruiterForm = this.fb.group({
    recruiterName: ['', Validators.required],
  });

  addNewRecruiterEntry(): void {

    let formValue = this.RecruiterForm.value;
    let obj = {
      recruiterName: formValue.recruiterName,
      type: 'post',
    };
    this.recruiterService.PostRecruiterData(obj).subscribe((data) => {
      this.getRecruiter();
      this.openSnackBar(data, 'ok')
      this.RecruiterForm.reset();
    });
    this.closeRecruiterForm();
  }

  USTPOCForm = this.fb.group({
    ustpocName: ['', Validators.required],
  });

  addNewUSTPOCEntry(): void {

    let formValue = this.USTPOCForm.value;
    let obj = {
      ustpocName: formValue.ustpocName,
      type: 'post',
    };
    this.pocService.PostUstPocData(obj).subscribe((data) => {
      this.getUstPoc();
      this.openSnackBar(data, 'ok')
      this.USTPOCForm.reset();
    });
    this.closeUSTPOCForm();
  }

  USTTPMForm = this.fb.group({
    usttpmName: ['', Validators.required],
    uSTTPMUID: ['', Validators.required],
  });

  addNewUSTTPMEntry(): void {

    let formValue = this.USTTPMForm.value;
    let obj = {
      usttpmName: formValue.usttpmName,
      uSTTPMUID:formValue.uSTTPMUID,
      type: 'post',
    };
    this.tpmService.PostUSTTPMData(obj).subscribe((data) => {
      this.getUSTTPM();
      this.openSnackBar(data, 'ok')
      this.USTTPMForm.reset();
    });
    this.closeUSTTPMForm();
  }

  getRoles() {
    this.registrationService.GetRoleData().subscribe((result) => {
      this.roleName = result;
      console.log(result)
    });
  }
  onRoleSelectionChange(event: any) {
    console.log(event)
    this.selectedRole = event.value;
    console.log(this.selectedRole);
  }

  resetAccount(row: any) {
    row.type = 'update';
    row.failureAttempts = 0;
    var emailId = row.emailId
    row.isLock = false;
    this.loginService.UpdateIsLock(emailId, row).subscribe(
      (response) => {
        console.log('Registration updated successfully', response);
        alert("Reset Successful");
        row.isEditing = false;
        this.getRegistration();
      },
      (error) => {
        console.error('Error updating Account data', error);
      }
    );
  }





}
