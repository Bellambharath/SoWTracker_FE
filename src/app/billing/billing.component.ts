import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { BillingService } from '../billing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegionModel } from '../Models/RegionModel';
import { EmployeeModel } from '../Models/EmployeeModel';
import { RegionService } from '../shared/Services/RegionService/region.service';

import { CustomerModel } from '../Models/CustomerModel';


import { USTTPMModel } from '../Models/USTTPMModel';
import { UstTpmService } from '../shared/Services/UsttpmService/ust-tpm.service';

import { CandidateService } from '../shared/Services/CandidateService/candidate.service';
import { CandidateModel } from '../Models/CandidateModel';

import { BusinessUnitService } from '../shared/Services/BUService/business-unit.service';
import { BU } from '../Models/BUModel';
import { Dept } from '../Models/DepartmentModel';
import { frequency } from '../Models/Frequency';
import { JobCode } from '../Models/JobcodeModel';
import { Loc } from '../Models/LocationTypeModel';
import { Manager } from '../Models/ProjectMangerModel';
import { DepartmentService } from '../shared/Services/DepartmentService/department.service';
import { FrequencyService } from '../shared/Services/FrequencyService/frequency.service';
import { JobcodeService } from '../shared/Services/JobCodeService/jobcode.service';
import { LocationTypeService } from '../shared/Services/LocationTypeService/location-type.service';
import { ProjectModel } from '../Models/ProjectModel';
import { CategoryModel } from '../Models/categoryMode';
import { EmployeeService } from '../shared/Services/EmployeeService/employee.service';
import { ProjectManagerService } from '../shared/Services/ProjectManagerService/project-manager.service';
import { CustomerService } from '../shared/Services/CustomerService/customer.service';
import { ProjectService } from '../shared/Services/ProjectService/ProjectService/project.service';
import { ContractCategoryService } from '../shared/Services/ContractCategoryService/contract-category.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  regionDataSource: MatTableDataSource<RegionModel>;
  locDataSource: MatTableDataSource<Loc>;
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;
  regionList: RegionModel[] = [];
  emplist : EmployeeModel[] =[];
  cuslist:CustomerModel[]=[];
  prolist : ProjectModel[]=[];
  catlist : CategoryModel[]=[];
  managerlist:Manager[]=[];
  joblist:JobCode[]=[];
  loclist : Loc[]=[];
  BUlist:BU[]=[];
  deptlist:Dept[]=[];
  freqlist:frequency[]=[];
  candidatelist:CandidateModel[]=[];
  statusList: any;
  User: any;
  isAuthor: boolean = false;
  isFormVisible: boolean = false;
  maxDate: Date;
  filteredCandidates: any[];
  IsAccessToEdit: boolean = true;
  ustTpmList: USTTPMModel[] = [];
  projectDetails: any;


  displayedColumns: string[] = ['candidateUid','candidateName','employeeType','obu','obuDescription','customerId','customerName', 
  'projectId','projectDescription','contractCategory','projectManagerId','projectManagerName','projectStartDate',
  'projectEndDate',"resourceStartDate","resourceEndDate",'region','locationId','locationDescription','jobCode','jobDescription','billable','clientProjectRole','clientProjectRoleDesc','aliasName',
  "billRate","hours","totalBilledhrs",'frequency',"currency",'allocationPercentage','usttpmuid','usttpmName','joiningDate','terminationDate','bussinessUnit','bussinessUnitDescription',
  'departmentId','departmentDescription','comments'
];

  dataSource!: MatTableDataSource<any>;
  constructor(private billingservice: BillingService,
    @Inject(LOCALE_ID) public locale: string,
    // private _router: ActivatedRoute,
    // private commonServ: CommonService,
    private _route: Router,
 	private router: ActivatedRoute
    ,private snackBar: MatSnackBar,
    private regionService: RegionService, 
    private employeeservice :EmployeeService,
    private customerservice :CustomerService,
    private projectservice : ProjectService,
    private categoryservice:ContractCategoryService,
    private managerservice : ProjectManagerService,
    private locservice: LocationTypeService,
    private jobcodeservice :JobcodeService,
    private tpmService: UstTpmService,
    private BUservice : BusinessUnitService,
    private _candidateService: CandidateService,
    private deptservice :DepartmentService,
    private frequencyservice:FrequencyService
    
  ) { 
    
    
    this.maxDate = new Date() }


  billingform = new FormGroup({
    resourceStartDate: new FormControl('', [Validators.required]),
     resourceEndDate: new FormControl('', [Validators.required]),
     resourceStartDateto: new FormControl('', [Validators.required]),
     resourceEndDateto: new FormControl('', [Validators.required]),
     domain: new FormControl('', [Validators.required]),
     currency: new FormControl('', [Validators.required]),
     billRate: new FormControl('', [Validators.required]),
     hours: new FormControl('', [Validators.required]),
     totalBilledhrs: new FormControl('', [Validators.required]),
      candidateId:new FormControl('', [Validators.required]),
      sowId: new FormControl('', Validators.required),
      employeeId: new FormControl('', [Validators.required]),
      customerTypeId: new FormControl('', [Validators.required]),
      projectTypeId: new FormControl('', [Validators.required]),
       billable: new FormControl('',[Validators.required]),
       clientProjectRole: new FormControl('', [Validators.required]),
       clientProjectRoleDesc: new FormControl('', [Validators.required]),
       aliasName: new FormControl('', [Validators.required]),
       allocationPercentage: new FormControl('', [Validators.required]),
       comments: new FormControl('', [Validators.required]),
       projectManagerTypeId: new FormControl('', [Validators.required]),
       contractCategoryId: new FormControl('', [Validators.required]),
       jobCodeId:new FormControl('', [Validators.required]),
       frequencyId: new FormControl('', Validators.required),
       bussinessUnitId: new FormControl('', [Validators.required]),
       departmentTypeId: new FormControl('', [Validators.required]), 
       candidateName:new FormControl('',[Validators.required]),
       candidateUid: new FormControl('',[Validators.required]),
       contractCategory: new FormControl('', [Validators.required]),
       customerId: new FormControl('', [Validators.required]),
       customerName: new FormControl('', [Validators.required]),
       departmentId: new FormControl('', [Validators.required]),
       departmentDescription: new FormControl('', [Validators.required]),
       employeeType: new FormControl('', [Validators.required]),
       frequency: new FormControl('', [Validators.required]),
       jobCode:new FormControl('', [Validators.required]),
       projectManagerId: new FormControl('', Validators.required),
       projectManagerName: new FormControl('', [Validators.required]),
       projectStartDate: new FormControl('', [Validators.required]), 
       projectStartDateto: new FormControl('', [Validators.required]), 
       jobDescription:new FormControl('',[Validators.required]),
       projectEndDate: new FormControl('', [Validators.required]),
       projectEndDateto: new FormControl('', [Validators.required]),
       projectId: new FormControl('', [Validators.required]), 
       projectDescription:new FormControl('',[Validators.required]),
       locationId : new FormControl('',[Validators.required]),
       locationDescription : new FormControl('',[Validators.required]),
       regionId : new FormControl('',[Validators.required]),
       usttpmName :  new FormControl('',[Validators.required]),
       obu : new FormControl('',[Validators.required]),
       obuDescription : new FormControl('',[Validators.required]),
       terminationDate:new FormControl('',[Validators.required]),
       terminationDateTo : new FormControl('',[Validators.required]),
       region : new FormControl('',[Validators.required]),
       usttpmuid : new FormControl('',[Validators.required]),
       joiningDate : new FormControl('',[Validators.required]),
       joiningDateTo : new FormControl('',[Validators.required]),
       bussinessUnit:new FormControl('',[Validators.required]),
       locationTypeId : new FormControl('',[Validators.required]),
       bussinessUnitDescription : new FormControl('',[Validators.required]),
       usttpmId:new FormControl('',[Validators.required])
      
  })

  ngOnInit(): void {
	this.router.queryParams.subscribe(params => {
      this.projectDetails = JSON.parse(atob(params['projectdetails']));
      console.log('Project Details:', this.projectDetails);
    });

    this.User = JSON.parse(sessionStorage.getItem("userData") as string);
     console.log(this.User)
    // //this.isAuthor = JSON.parse(sessionStorage.getItem("author") as string);
   this.IsAccessToEdit = this.User.RoleName === "TPM" ? true : false;
    // console.log(this.IsAccessToEdit)
    if (this.IsAccessToEdit) {
      this.displayedColumns.push('actions');
    }
    this.GetbillingByType();
   
    this.GetDropdown7();
    this.GetDropdown8();
    this.GetDropdown9();
    this.GetDropdown6();
    this.GetDropdown5();
    this.GetDropdown4();
    this.GetDropdown3();
    this.GetDropdown2();
    this.GetDropdown1();
    this.GetDropdown10();
    this.GetDropdown();
    this.GetDropdown11();
    this.GetDropdown12();
  }

  GetbillingByType() {
    console.log(this.projectDetails.projectId)
    this.billingservice.GetBillingById(this.projectDetails.projectId).subscribe(result => {
      this.statusList = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.statusList)

    })
  }


  
  markAllFieldsAsUntouched() {
    Object.keys(this.billingform.controls).forEach((fieldName: string) => {
      const control = this.billingform.get(fieldName);
      if (control) {
        control.markAsUntouched();
      }
    });
  }

  canExit() {
    if (this.billingform.dirty) {
      return confirm('You have unsaved changes. Do you really want to discard these changes?');
    }
    else {
      return true;
    }
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;

  }

  restCustomFilter() {
    this.billingform.reset()
    this.customFilter()
    this.toggleFormVisibility()
  }
  clearFormField(fieldName: string): void {
    this.billingform.get(fieldName)?.setValue('');
    this.customFilter()
  }



  customFilter(): void {
    let resourceStartDate = this.billingform.value.resourceStartDate;
    let resourceEndDate = this.billingform.value.resourceEndDate;
    let resourceStartDateto = this.billingform.value.resourceStartDateto;
    let resourceEndDateto = this.billingform.value.resourceEndDateto;
    
    let currency = this.billingform.value.currency;
    let billRate = this.billingform.value.billRate;
    let hours = this.billingform.value.hours;
    let totalBilledhrs = this.billingform.value.totalBilledhrs;
  
    let regionId = this.billingform.value.regionId;
    let locationTypeId = this.billingform.value.locationTypeId;
  
    let billable = this.billingform.value.billable;
    let clientProjectRole = this.billingform.value.clientProjectRole;
    let clientProjectRoleDesc = this.billingform.value.clientProjectRoleDesc;
    let aliasName = this.billingform.value.aliasName;
    let allocationPercentage = this.billingform.value.allocationPercentage;
    let comments = this.billingform.value.comments;
  
    let candidateId = this.billingform.value.candidateId;
    
    let contractCategoryId= this.billingform.value.contractCategoryId;
    let customerTypeId= this.billingform.value.customerTypeId;
   
    let departmentTypeId = this.billingform.value.departmentTypeId;
    
    let employeeId = this.billingform.value.employeeId;
    let frequencyId = this.billingform.value.frequencyId;
    let jobCodeId = this.billingform.value.jobCodeId;
    let projectManagerTypeId = this.billingform.value.projectManagerTypeId;
  
    let projectStartDate = this.billingform.value.projectStartDate;
    let projectStartDateto = this.billingform.value.projectStartDateto;
    
    let projectEndDate = this.billingform.value.projectEndDate;
    let projectEndDateto = this.billingform.value.projectEndDateto;
    let projectTypeId = this.billingform.value.projectTypeId;
   
    let obu =this.billingform.value.obu;
    let obuDescription =this.billingform.value.obuDescription
    let terminationDate =this.billingform.value.terminationDate
    let terminationDateTo = this.billingform.value.terminationDateTo
   
 let usttpmId = this.billingform.value.usttpmId
 let joiningDate = this.billingform.value.joiningDate
 let joiningDateTo = this.billingform.value.joiningDateTo
let bussinessUnitId = this.billingform.value.bussinessUnitId

this.filteredCandidates = this.statusList.filter((item: any) => {

     

     

  if (obu && item.obu != obu) {

    return false;

  }





  if (obuDescription && !item.obuDescription.toLowerCase().startsWith(obuDescription.toLowerCase())) {

    return false;



  }



  if (currency && !item.currency.toLowerCase().startsWith(currency.toLowerCase())) {

    return false;

  }



  if (locationTypeId && item.locationTypeId !== locationTypeId) {

    return false;

  }

 

  if (billRate && item.billRate != billRate) {

    return false;

  }



  if (hours && item.hours != hours) {

    return false;

  }



  if (totalBilledhrs && item.totalBilledhrs != totalBilledhrs) {

    return false;

  }



 

  if (usttpmId && item.usttpmId !== usttpmId) {

    return false;

  }

 



  if (billable !== null && billable !== undefined) {

    if (billable && (billable === 'true' && !item.billable) || (billable === 'false' && item.billable)) {

      return false;

    }

  }

  if (regionId && item.regionId !== regionId) {

    return false;

  }



 

  if (clientProjectRole  && !item.clientProjectRole.toLowerCase().startsWith(clientProjectRole.toLowerCase())) {

    return false;

  }



  if (clientProjectRoleDesc && !item.clientProjectRoleDesc.toLowerCase().startsWith(clientProjectRoleDesc.toLowerCase())) {

    return false;

  }



  if (aliasName  && !item.aliasName.toLowerCase().startsWith(aliasName.toLowerCase()) ) {

    return false;

  }



  if (allocationPercentage  && item.allocationtage != allocationPercentage) {

    return false;

  }



  if (comments  && !item.comments.toLowerCase().startsWith(comments.toLowerCase()) ) {

    return false;

  }





  if (candidateId && item.candidateId !== candidateId) {

    return false;

  }

  if (contractCategoryId && item.contractCategoryId !== contractCategoryId) {

    return false;

  }



  if (customerTypeId && item.customerTypeId !== customerTypeId) {

    return false;

  }





 



  if (departmentTypeId   && item.departmentTypeId !== departmentTypeId) {

    return false;

  }









  if (employeeId && item.employeeId !== employeeId) {

    return false;

  }



  if (frequencyId && item.frequencyId !== frequencyId) {

    return false;

  }

  if (jobCodeId && item.jobCodeId !== jobCodeId) {

    return false;

  }



  if (bussinessUnitId && item.bussinessUnitId !== bussinessUnitId) {

    return false;



  }

 





  if (projectManagerTypeId && item.projectManagerTypeId !== projectManagerTypeId) {

    return false;

  }



 

  if (projectStartDate  && projectStartDateto  && !((new Date(item.projectStartDate) >= new Date(projectStartDate )) && (new Date(item.projectStartDate) <= new Date(projectStartDateto)))) {

    return false;

  }



  if (projectEndDate  && projectEndDateto  && !((new Date(item.projectEndDate) >= new Date(projectEndDate)) && (new Date(item.projectEndDate) <= new Date(projectEndDateto)))) {

    return false;

  }

  if (projectTypeId && item.projectTypeId !== projectTypeId) {

    return false;

  }

  if (resourceStartDate  && resourceStartDateto  && !((new Date(item.resourceStartDate) >= new Date(resourceStartDate )) && (new Date(item.resourceStartDate) <= new Date(resourceStartDateto)))) {

    return false;

  }



  if (resourceEndDate  && resourceEndDateto  && !((new Date(item.resourceEndDate) >= new Date(resourceEndDate)) && (new Date(item.resourceEndDate) <= new Date(resourceEndDateto)))) {

    return false;

  }



  if (joiningDate  && joiningDateTo  && !((new Date(item.joiningDate) >= new Date(joiningDate )) && (new Date(item.joiningDate) <= new Date(joiningDateTo)))) {

    return false;

  }



  if (terminationDate  && terminationDateTo  && !((new Date(item.terminationDate) >= new Date(terminationDate)) && (new Date(item.terminationDate) <= new Date(terminationDateTo)))) {

    return false;

  }



  return true;

});





    // console.table(filteredArray)
    this.dataSource = new MatTableDataSource(this.filteredCandidates);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getRegionName(regionId: number): string {
    console.log(regionId)
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

  // UPDATE
  selectRow(item: any) {
    this.dataSource.data.forEach((element: any) => {
      element.isEditing = false
    });
    item.isEditing = true;
  }

  cancelUpdate(item: any) {
    item.isEditing = false;
  }

  UpdatebillingData(item: any) {
    console.log(item)
    if (item) {
      item.isEditing = false;
      delete item.isEditing;
      item.resourceStartDate = (this.formatdate(item.resourceStartDate) + "T00:00:00.00Z")
      item.resourceEndDate = (this.formatdate(item.resourceEndDate) + "T00:00:00.00Z");
      item.projectStartDate = (this.formatdate(item.projectStartDate) + "T00:00:00.00Z")
      item.projectEndDate = (this.formatdate(item.projectEndDate) + "T00:00:00.00Z");
      
    }
    // const region = this.locDataSource.data.find(
    //   (r) => r.locationId ===  item.locationTypeId
    // );
    // item.isEditing = !item.isEditing;
    console.log(item.locationId)
    this.billingservice.UpdateBillingData(item.billingId, item).subscribe(
      (data) => {
        
        this.openSnackBar("Successfully Updated", "ok")

      },
      (err) => {
        console.log(err);
      }
    )
    console.log(item.billingId)
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  GetDropdown() {
    return new Promise((res) => {
      this.deptservice.GetAllDeptData().subscribe((result) => {
        this.deptlist = result;
        res('');
      });
    });
  }
  GetDropdown1() {
    return new Promise((res) => {
      this.tpmService.GetAllUSTTPMData().subscribe((result) => {
        this.ustTpmList = result;
        console.log(this.ustTpmList)
        res('');
      });
    });
  }
  GetDropdown2() {
    return new Promise((res, rej) => {
      this.jobcodeservice.GetAlljobcodeData().subscribe((result) => {
        this.joblist = result;
        res('');
      });
    });
  }
  GetDropdown3() {
    return new Promise((res, rej) => {
      this.locservice.GetAllLocationTypeData().subscribe((result) => {
        this.loclist = result;
        console.log(this.loclist)
        res('');
      });
    });
  }
  GetDropdown4() {
    return new Promise((res, rej) => {
      this.managerservice.GetAllManagerData().subscribe((result) => {
        this.managerlist = result;
        res('');
      });
    });
  }
  GetDropdown5() {
    return new Promise((res, rej) => {
      this.categoryservice.GetAllCategoryData().subscribe((result) => {
        this.catlist = result;
        res('');
      });
    });
  }
  GetDropdown6() {
    return new Promise((res, rej) => {
      this.projectservice.GetAllProjectData().subscribe((result) => {
        this.prolist = result;
        res('');
      });
    });
  }
  GetDropdown7() {
    return new Promise((res, rej) => {
      this.regionService.GetAllRegionData().subscribe((result) => {
        this.regionList = result;
        console.log(this.regionList)
        res('');
      });
    });
  }
  GetDropdown8() {
    return new Promise((res, rej) => {
      this.employeeservice.GetAllEmployeeData().subscribe((result) => {
        this.emplist = result;
        res('');
      });
    });
  }
  GetDropdown9() {
    return new Promise((res, rej) => {
      this.customerservice.GetAllCustomerData().subscribe((result) => {
        this.cuslist = result;
        res('');
      });
    });
  }
  GetDropdown10() {
    return new Promise((res, rej) => {
      this.BUservice.GetAllBUData().subscribe((result) => {
        this.BUlist = result;
        res('');
      });
    });
  }

  GetDropdown11() {
    return new Promise((res, rej) => {
      this._candidateService.GetAllCandidatesData().subscribe((result) => {
        this.candidatelist = result;
        res('');
      });
    });
  }
  GetDropdown12() {
    return new Promise((res, rej) => {
      this.frequencyservice.GetAllFreqData().subscribe((result) => {
        this.freqlist = result;
        res('');
      });
    });
  }

  deleteDetails(item: any) {
    if (confirm("Do you want to delete record ")) {
      this.billingservice.DeleteBillingData(item.billingId).subscribe((res) => {
        alert(res);
        this.GetbillingByType();
      });
    }

  }

  formatdate(date: any) {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }


}