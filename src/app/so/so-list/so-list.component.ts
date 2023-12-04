import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/Models/AccountModel';
import { DellManagerModel } from 'src/app/Models/DellManagerModel';
import { LocationModel } from 'src/app/Models/LocationModel';
import { MappingModel } from 'src/app/Models/MappingModel';
import { RecruiterModel } from 'src/app/Models/RecruiterModel';
import { RegionModel } from 'src/app/Models/RegionModel';
import { StatusModel } from 'src/app/Models/StatusModel';
import { TechnologyModel } from 'src/app/Models/TechnologyModel';
import { USTPOCModel } from 'src/app/Models/USTPOCModel';
import { USTTPMModel } from 'src/app/Models/USTTPMModel';
import { SoService } from 'src/app/shared/Services/SoService/so.service';
import { RegionService } from 'src/app/shared/Services/RegionService/region.service';
import { LocationService } from 'src/app/shared/Services/LocationService/location.service';
import { AccountService } from 'src/app/shared/Services/AccountService/account.service';
import { UstTpmService } from 'src/app/shared/Services/UsttpmService/ust-tpm.service';
import { UstPocService } from 'src/app/shared/Services/UstpocService/ust-poc.service';
import { RecruiterService } from 'src/app/shared/Services/RecruiterService/recruiter.service';
import { DellManagerService } from 'src/app/shared/Services/DellManagerService/dell-manager.service';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';
import { TechnologyService } from 'src/app/shared/Services/TechnologyService/technology.service';
import { CandidateMappingService } from 'src/app/shared/Services/CandidateMappingService/candidate-mapping.service';

import { RoleDetails } from 'src/app/Models/Roledetails';
import { RoledetailsService } from 'src/app/roledetails.service';
@Component({
  selector: 'app-so-list',
  templateUrl: './so-list.component.html',
  styleUrls: ['./so-list.component.css']
})
export class SoListComponent {
  roledetailslist:RoleDetails[]=[]
  regionList: RegionModel[] = [];
  accountList: AccountModel[] = [];
  technologyList: TechnologyModel[] = [];
  locationList: LocationModel[] = [];
  ustPocList: USTPOCModel[] = [];
  ustTpmList: USTTPMModel[] = [];
  recruiterList: RecruiterModel[] = [];
  dellManagerList: DellManagerModel[] = [];
  statusList: StatusModel[] = [];
  mappinglst: MappingModel[] = [];
  selectedRegionId: string = '';
  isRegionSelected: boolean = false;

  submitted: boolean = false;
  maxDate:Date;
  constructor(private service: SoService, private regionService: RegionService, private locationService: LocationService,
    private accountService: AccountService, private tpmService:  UstTpmService, private pocService: UstPocService, private recruiterService: RecruiterService,
    private dellManagerService: DellManagerService, private statusService: StatusService, private techService: TechnologyService,
    private mappingService: CandidateMappingService,private router: ActivatedRoute, private route: Router,
    private roledetails:RoledetailsService) 
    { this.maxDate = new Date() }
    
    ngOnInit(): void {
      this.GetDropdown1();
      this.GetDropdown2();
      this.GetDropdown3();
      this.GetDropdown4();
      this.GetDropdown5();
      this.GetStatusByType();
      this.GetDropdown7();
      this.GetDropdown8();
      this.GetDropdown11();
      this.GetDropdown10();
      this.GetDropdown19();

    }
    GetDropdown1() {
      return new Promise((res, rej) => {
        this.accountService.GetAllAccountData().subscribe(result => {
          this.accountList = result;
          res('')
        })
      })
    }

    GetDropdown2() {
      return new Promise((res, rej) => {
        this.techService.GetAllTechData().subscribe(result => {
          this.technologyList = result;
          res('')
        })
      })
    }

    GetDropdown3() {
      return new Promise((res, rej) => {
        this.recruiterService.GetAllRecruiterData().subscribe(result => {
          this.recruiterList = result;
          res('');
        })
      })
    }

    GetDropdown4() {
      return new Promise((res, rej) => {
        this.pocService.GetAllUstPocData().subscribe(result => {
          this.ustPocList = result;
          res('')
        })
      })
    }

    GetDropdown5() {
      return new Promise((res, rej) => {
        this.dellManagerService.GetAllDellManagerData().subscribe(result => {
          this.dellManagerList = result;
          res('')
        })
      })
    }

    getStatus() {
      return new Promise((res, rej) => {
        this.statusService.GetAllStatusData().subscribe(result => {
          this.statusList = result;
          res('')
        })
      })
    }

    GetStatusByType() {
      return new Promise((res, rej) => {
        this.statusService.GetStatusByType('so').subscribe(result => {
          this.statusList = result;
          res('')
        })
      })
    }

    GetDropdown7() {
      return new Promise((res, rej) => {
        this.regionService.GetAllRegionData().subscribe(result => {
          this.regionList = result;
          res('')
        })
      })
    }

    GetDropdown8() {
      return new Promise((res) => {
        this.tpmService.GetAllUSTTPMData().subscribe(result => {
          this.ustTpmList = result;
          res('')
        })
      })
    }

    onRegionSelected(regionId: string): void {
      this.selectedRegionId = regionId;
      console.log('Selected region:', this.selectedRegionId);
      this.GetDropdown9(regionId);
      this.isRegionSelected = true;

    }

    GetDropdown9(id: any) {
      return new Promise((res, rej) => {
        this.locationService.GetLocationByRegionId(id).subscribe(result => {
          this.locationList = result;
          console.log(this.locationList);
          res('')
        })
      })
    }
    GetDropdown11() {

      return new Promise((res, rej) => {
        this.locationService.GetAllLocationData().subscribe(result => {
          this.locationList = result;
          console.log(this.locationList);
          res('')
        })
      })
    }
    GetDropdown10() {
      return new Promise((res, rej) => {
        this.mappingService.GetAllCandidateMappingData().subscribe((result) => {
          this.mappinglst = result;
          res('')
        })
      })
    }

    GetDropdown19() {
      return new Promise((res, rej) => {
        this.roledetails.GetAllRoledetailsData().subscribe((result) => {
          this.roledetailslist = result;
          console.log(this.roledetailslist)
          res('')
        })
      })
    }

      private fb = inject(FormBuilder);
      SowForm = this.fb.group({
      soName: [null, Validators.required],
      jrCode: [null, Validators.required],
      requestCreationDate: [null, Validators.required],
      accountId: [null, Validators.required],
      technologyId: [null, Validators.required],
      regionId: [null, Validators.required],
      role: [null, Validators.required],
      locationId: [null, Validators.required],
      targetOpenPositions: [null, Validators.required],
      positionsTobeClosed: [null, Validators.required],
      ustpocId: [null, Validators.required],
      recruiterId: [null, Validators.required],
      usttpmId: [null, Validators.required],
      dellManagerId: [null, Validators.required],
      statusId: [null, Validators.required],
      band: [null, Validators.required],
      projectId: [null, Validators.required],
      accountManager: [null, Validators.required],
      externalResource: [null, Validators.required],
      internalResource: [null, Validators.required],
      onboardingdate:[null, Validators.required],
      isOnHold:[null,Validators.required],
      ageingColor:[null,Validators.required],
      jobDesc:[null,Validators.required],
      roleDetailsId:[null,Validators.required],
      experienceinyears:[null,Validators.required]
    });
  get f() { return this.SowForm.controls; }

onSubmit() {
  console.log(this.SowForm.value);
  this.submitted = true;
  if (this.SowForm.invalid) {
    this.markAllFieldsAsTouched();
    return;
  }
  this.onAdd();
  this.SowForm.reset();

}
markAllFieldsAsUntouched() {
  Object.keys(this.SowForm.controls).forEach((fieldName: string) => {
    const control = this.SowForm.get(fieldName);
    if (control) {
      control.markAsUntouched();
    }
  });
}
isFieldInvalid(fieldName: string): boolean {
  const control = this.SowForm.get(fieldName);
  return (control?.invalid ?? false) && (control?.touched || this.submitted);}
markAllFieldsAsTouched() {
  Object.keys(this.SowForm.controls).forEach((fieldName: string) => {
    const control = this.SowForm.get(fieldName);
    if (control) {
      control.markAsTouched();
    }
  });
}

onAdd() {
  let formValue = this.SowForm.value;
  let obj = {
    soName: formValue.soName,
    jrCode: formValue.jrCode,
    requestCreationDate: formValue.requestCreationDate,
    accountId: formValue.accountId,
    technologyId: formValue.technologyId,
    role: formValue.role,
    regionId: formValue.regionId,
    locationId: formValue.locationId,
    targetOpenPositions: formValue.targetOpenPositions,
    positionsTobeClosed: formValue.positionsTobeClosed,
    ustpocId: formValue.ustpocId,
    recruiterId: formValue.recruiterId,
    usttpmId: formValue.usttpmId,
    dellManagerId: formValue.dellManagerId,
    statusId: formValue.statusId,
    band: formValue.band,
    projectId: formValue.projectId,
    accountManager: formValue.accountManager,
    internalResource: (formValue.internalResource == null) ? "" : formValue.internalResource,
    externalResource: (formValue.externalResource == null) ? "" : formValue.externalResource,
    onboardingdate:formValue.onboardingdate,
    isOnHold:formValue.isOnHold,
    ageingColor:formValue.ageingColor,
    jobDesc:formValue.jobDesc,
    roleDetailsId:formValue.roleDetailsId,
    experienceinyears:formValue.experienceinyears,
    type: "insert",
  };
  this.service.PostSowData(obj).subscribe(data => {
    console.log(data)
    alert(data);
    this.SowForm.reset();
    this.markAllFieldsAsUntouched();

  })
}

cancel() {
  this.route.navigate(['/sow']);
}
canExit() {
  if (this.SowForm.dirty) {
    return confirm('You have unsaved changes. Do you really want to discard these changes?');
  }
  else {
    return true;
  }
}

}
