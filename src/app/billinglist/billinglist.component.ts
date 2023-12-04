import { AfterViewChecked, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../billing.service';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/Services/CustomerService/customer.service';
import { CandidateService } from '../shared/Services/CandidateService/candidate.service';
import { EmployeeService } from '../shared/Services/EmployeeService/employee.service';
import { ContractCategoryService } from '../shared/Services/ContractCategoryService/contract-category.service';
import { ProjectManagerService } from '../shared/Services/ProjectManagerService/project-manager.service';
import { RegionService } from '../shared/Services/RegionService/region.service';
import { LocationTypeService } from '../shared/Services/LocationTypeService/location-type.service';
import { JobcodeService } from '../shared/Services/JobCodeService/jobcode.service';
import { FrequencyService } from '../shared/Services/FrequencyService/frequency.service';
import { UstTpmService } from '../shared/Services/UsttpmService/ust-tpm.service';
import { BusinessUnitService } from '../shared/Services/BUService/business-unit.service';
import { DepartmentService } from '../shared/Services/DepartmentService/department.service';
import { ProjectService } from '../shared/Services/ProjectService/ProjectService/project.service';

@Component({
  selector: 'app-billinglist',
  templateUrl: './billinglist.component.html',
  styleUrls: ['./billinglist.component.css']
})
export class BillinglistComponent {
  billingList: any;
  candidateList: any;
  customerList: any;
  employeeList: any;
  projectList: any;
  contractcategoryList: any;
  projectmanagerList: any;
  countryList: any;
  locationtypeList: any;
  jobcodeList: any;
  frequencyList: any;
  usttpmList: any;
  buList: any;
  departmentList: any;
  maxDate: Date;
  selectedValue: boolean | null = null;
  BillingForm: FormGroup;

  constructor(private billingservice: BillingService, private candidateservice: CandidateService,
    private customerservice: CustomerService, private employeeservice: EmployeeService, private projectservice: ProjectService,
    private route: Router, private contractcategory: ContractCategoryService, private projectmanager: ProjectManagerService,
    private regionservice: RegionService, private locationtype: LocationTypeService, private jobcodeservice: JobcodeService,
    private frequencyservice: FrequencyService, private usttpmservice: UstTpmService, private buservice: BusinessUnitService,
    private department: DepartmentService, private formBuilder: FormBuilder
  ) {
    this.maxDate = new Date()
    this.BillingForm = this.formBuilder.group({
      CandidateId: [null, Validators.required],
      CandidateName: [null, Validators.required],
      EmployeeId: [null, Validators.required],
      OBU: [null, Validators.required],
      OBUDescription: [null, Validators.required],
      CustomerTypeId: [null, Validators.required],
      CustomerName: [null, Validators.required],
      ProjectTypeId: [null, Validators.required],
      ProjectDescription: [null, Validators.required],
      ContractCategoryId: [null, Validators.required],
      ProjectManagerTypeId: [null, Validators.required],
      ProjectManagerName: [null, Validators.required],
      ProjectStartDate: [null, Validators.required],
      ProjectEndDate: [null, Validators.required],
      ResourceStartDate: [null, Validators.required],
      ResourceEndDate: [null, Validators.required],
      RegionId: [null, Validators.required],
      LocationTypeId: [null, Validators.required],
      LocationDescription: [null, Validators.required],
      JobCodeId: [null, Validators.required],
      JobDescription: [null, Validators.required],
      Billable: [null, Validators.required],
      ClientProjectRole: [null, Validators.required],
      ClientProjectRoleDesc: [null, Validators.required],
      AliasName: [null, Validators.required],
      BillRate: [null, Validators.required],
      Hours: [null, Validators.required],
      Totalbilledhrs: [null, Validators.required],
      FrequencyId: [null, Validators.required],
      Currency: [null, Validators.required],
      AllocationPercentage: [null, Validators.required],
      UsttpmId: [null, Validators.required],
      USTTPMName: [null, Validators.required],
      JoiningDate: [null, Validators.required],
      TerminationDate: [null, Validators.required],
      BussinessUnitId: [null, Validators.required],
      BussinessUnitDescription: [null, Validators.required],
      DepartmentTypeId: [null, Validators.required],
      DepartmentDescription: [null, Validators.required],
      Comments: [null, Validators.required]
    });
    this.BillingForm.get('CandidateId')?.valueChanges.subscribe((selectedCandidateUID) => {
      const selectedCandidate = this.candidateList.find((candidate: any) => candidate.candidateId === selectedCandidateUID);

      if (selectedCandidate) {
        this.BillingForm.get('CandidateName')?.setValue(selectedCandidate.candidateName);
      } else {
        this.BillingForm.get('CandidateName')?.setValue(''); // Clear the field if no candidate is selected
      }
    });
    this.BillingForm.get('CustomerTypeId')?.valueChanges.subscribe((selectedCustomerID) => {
      const selectedCustomer = this.customerList.find((customer: any) => customer.customerTypeId === selectedCustomerID);

      if (selectedCustomer) {
        this.BillingForm.get('CustomerName')?.setValue(selectedCustomer.customerName);
      } else {
        this.BillingForm.get('CustomerName')?.setValue(''); // Clear the field if no candidate is selected
      }
    });
    this.BillingForm.get('ProjectManagerTypeId')?.valueChanges.subscribe((selectedProjectmanagerID) => {
      const selectedProjectmanager = this.projectmanagerList.find((projectmanager: any) => projectmanager.projectManagerTypeId === selectedProjectmanagerID);

      if (selectedProjectmanager) {
        this.BillingForm.get('ProjectManagerName')?.setValue(selectedProjectmanager.projectManagerName);
      } else {
        this.BillingForm.get('ProjectManagerName')?.setValue(''); // Clear the field if no candidate is selected
      }
    });
    this.BillingForm.get('UsttpmId')?.valueChanges.subscribe((selectedManagerID) => {
      const selectedManager = this.usttpmList.find((manager: any) => manager.usttpmId === selectedManagerID);

      if (selectedManager) {
        this.BillingForm.get('USTTPMName')?.setValue(selectedManager.usttpmName);
      } else {
        this.BillingForm.get('USTTPMName')?.setValue('');
      }
    });
    this.BillingForm.get('ProjectTypeId')?.valueChanges.subscribe((selectedProjectID) => {
      const selectedProject = this.projectList.find((project: any) => project.projectTypeId === selectedProjectID);

      if (selectedProject) {
        this.BillingForm.get('ProjectDescription')?.setValue(selectedProject.projectDescription);
      } else {
        this.BillingForm.get('ProjectDescription')?.setValue('');
      }
    });
    this.BillingForm.get('LocationTypeId')?.valueChanges.subscribe((selectedLocation) => {
      const selectedLocationdescr = this.locationtypeList.find((location: any) => location.locationTypeId === selectedLocation);

      if (selectedLocationdescr) {
        this.BillingForm.get('LocationDescription')?.setValue(selectedLocationdescr.locationDescription);
      } else {
        this.BillingForm.get('LocationDescription')?.setValue('');
      }
    });
    this.BillingForm.get('JobCodeId')?.valueChanges.subscribe((selectedJobCode) => {
      const selectedJobDescr = this.jobcodeList.find((jobcode: any) => jobcode.jobCodeId === selectedJobCode);

      if (selectedJobDescr) {
        this.BillingForm.get('JobDescription')?.setValue(selectedJobDescr.jobDescription);
      } else {
        this.BillingForm.get('JobDescription')?.setValue('');
      }
    });
    this.BillingForm.get('DepartmentTypeId')?.valueChanges.subscribe((selecteddepartmentid) => {
      const selecteddepartmentDescr = this.departmentList.find((deparmentid: any) => deparmentid.departmentTypeId === selecteddepartmentid);
      if (selecteddepartmentDescr) {
        this.BillingForm.get('DepartmentDescription')?.setValue(selecteddepartmentDescr.departmentDescription);
      } else {
        this.BillingForm.get('DepartmentDescription')?.setValue('');
      }
    });
    this.BillingForm.get('BussinessUnitId')?.valueChanges.subscribe((selectebu) => {
      const selectedbuDescr = this.buList.find((bu: any) => bu.bussinessUnitId === selectebu);

      if (selectedbuDescr) {
        this.BillingForm.get('BussinessUnitDescription')?.setValue(selectedbuDescr.bussinessUnitDescription);
      } else {
        this.BillingForm.get('BussinessUnitDescription')?.setValue('');
      }
    });

  }




  get f() { return this.BillingForm.controls; }


  ngOnInit(): void {
    this.GetBillingdata();
    this.GetCandidatedata();
    this.GetCustomerdata();
    this.GetEmployeedata();
    this.GetProjectdata();
    this.GetContractCategorydata();
    this.GetProjectManagerdata();
    this.GetCountrydata();
    this.GetLocationtypedata();
    this.GetJobcodedata();
    this.GetFrequencydata();
    this.GetManagerdata();
    this.GetBUdata();
    this.GetDepartmentdata();
  }

  updateCandidateName(event: any) {
    const selectedCandidateUID = event.value;
    console.log('Selected Candidate:', selectedCandidateUID);


    const selectedCandidate = this.candidateList.find((candidate: any) => candidate.candidateId === selectedCandidateUID);
    console.log('Selected Candidate:', selectedCandidate);

    if (selectedCandidate) {
      this.BillingForm.get('CandidateName')?.setValue(selectedCandidate.candidateName);
    }
  }

  updateCustomerName(event: any) {
    const selectedCustomerID = event.value;

    const selectedCustomer = this.customerList.find((customer: any) => customer.customerTypeId === selectedCustomerID);
    console.log('Selected Customer:', selectedCustomer);

    if (selectedCustomer) {
      this.BillingForm.get('CustomerName')?.setValue(selectedCustomer.customerName);
    }
  }
  updateProjectmanagerName(event: any) {
    const selectedProjectmanagerID = event.value;

    const selectedProjectmanager = this.projectmanagerList.find((projectmanager: any) => projectmanager.projectManagerTypeId === selectedProjectmanagerID);

    if (selectedProjectmanager) {
      this.BillingForm.get('ProjectManagerName')?.setValue(selectedProjectmanager.projectManagerName);
    }
  }
  updateManagerName(event: any) {
    const selectedManagerID = event.value;

    const selectedManager = this.usttpmList.find((manager: any) => manager.usttpmId === selectedManagerID);

    if (selectedManager) {
      this.BillingForm.get('ProjectManagerName')?.setValue(selectedManager.usttpmName);
    }
  }
  updateProjectDescription(event: any) {
    const selectedProjectID = event.value;


    const selectedProject = this.projectList.find((project: any) => project.projectTypeId === selectedProjectID);


    if (selectedProject) {
      this.BillingForm.get('ProjectDescription')?.setValue(selectedProject.projectDescription);
    }
  }
  updateLocationDescription(event: any) {
    const selectedLocation = event.value;

    const selectedLocationdescr = this.locationtypeList.find((location: any) => location.locationTypeId === selectedLocation);

    if (selectedLocation) {
      this.BillingForm.get('LocationDescription')?.setValue(selectedLocation.locationDescription);
    }
  }
  updateJobCodeDescription(event: any) {
    const selectedJobCode = event.value;

    const selectedJobcodedescr = this.jobcodeList.find((jobcode: any) => jobcode.jobCodeId === selectedJobCode);

    if (selectedJobcodedescr) {
      this.BillingForm.get('JobDescription')?.setValue(selectedJobcodedescr.jobDescription);
    }
  }

  updatedepartmentDescr(event: any) {
    const selecteddepartmentid = event.value;

    const selecteddepartmentDescr = this.departmentList.find((departmentid: any) => departmentid.DepartmentTypeId === selecteddepartmentid);
console.log(selecteddepartmentDescr)
    if (selecteddepartmentDescr) {
      this.BillingForm.get('DepartmentDescription')?.setValue(selecteddepartmentDescr.departmentDescription);
    }
  }

  updatebudescription(event: any) {
    const selectebu = event.value;

    const selectedbuDescr = this.buList.find((bu: any) => bu.bussinessUnitId === selectebu);

    if (selectedbuDescr) {
      this.BillingForm.get('BussinessUnitDescription')?.setValue(selectedbuDescr.bussinessUnitDescription);
    }
  }


  GetBillingdata() {
    this.billingservice.GetAllBillingData().subscribe(result => {
      this.billingList = result;
      console.log(result)
    })
  }
  GetCustomerdata() {
    this.customerservice.GetAllCustomerData().subscribe(result => {
      this.customerList = result;
      console.log(result)
    })
  }
  GetCandidatedata() {
    this.candidateservice.GetAllCandidatesData().subscribe(result => {
      this.candidateList = result;
      console.log(result)
    })
  }
  GetEmployeedata() {
    this.employeeservice.GetAllEmployeeData().subscribe(result => {
      this.employeeList = result;
      console.log(result)
    })
  }
  GetProjectdata() {
    this.projectservice.GetAllProjectData().subscribe(result => {
      this.projectList = result;
      console.log(result)
    })
  }
  GetContractCategorydata() {
    this.contractcategory.GetAllContractCategoryData().subscribe(result => {
      this.contractcategoryList = result;
      console.log(result)
    })
  }
  GetProjectManagerdata() {
    this.projectmanager.GetAllProjectManagerData().subscribe(result => {
      this.projectmanagerList = result;
      console.log(result)
    })
  }
  GetCountrydata() {
    this.regionservice.GetAllRegionData().subscribe(result => {
      this.countryList = result;
      console.log(result)
    })
  }
  GetLocationtypedata() {
    this.locationtype.GetAllLocationTypeData().subscribe(result => {
      this.locationtypeList = result;
      console.log(result)

    })
  }
  GetJobcodedata() {
    this.jobcodeservice.GetAllJobcodeData().subscribe(result => {
      this.jobcodeList = result;
      console.log(result)
    })
  }
  GetFrequencydata() {
    this.frequencyservice.GetAllFrequencyData().subscribe(result => {
      this.frequencyList = result;
      console.log(result)
    })
  }
  GetManagerdata() {
    this.usttpmservice.GetAllUSTTPMData().subscribe(result => {
      this.usttpmList = result;
      console.log(result);
    })
  }
  GetBUdata() {
    this.buservice.GetAllBUData().subscribe(result => {
      this.buList = result;
      console.log(result)
    })
  }
  GetDepartmentdata() {
    this.department.GetAllDepartmentData().subscribe(result => {
      this.departmentList = result;
      console.log(result)
    })
  }

  onSubmit(): void {

    console.log(this.BillingForm.value);


   
    debugger

    if (this.BillingForm.valid) {
      this.billingservice.PostBillingData(this.BillingForm.value).subscribe(data => {
        console.log(data);
        // this.BillingForm.reset();
        // this.BillingForm.markAsUntouched()
        this.markAllFieldsAsUntouched();

      },
        err =>
          console.log(err))
    }
    else {
      alert("All Fields are mandatory")

    }
  }

  markAllFieldsAsUntouched() {
    Object.keys(this.BillingForm.controls).forEach((fieldName: string) => {
      const control = this.BillingForm.get(fieldName);
      if (control) {
        control.markAsUntouched();
      }
    });
  }
}
