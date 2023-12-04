import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/shared/Services/CandidateService/candidate.service';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  statusList: any;
  isAuthor: boolean = false;
  
  maxDate: Date;
  constructor(private _candidateService: CandidateService,
    @Inject(LOCALE_ID) public locale: string,
    // private _router: ActivatedRoute,
    // private commonServ: CommonService,
    private _route: Router,
    private _statusService: StatusService
  ) { 
    
    
    this.maxDate = new Date() }


  candidateform = new FormGroup({
    candidateName: new FormControl('', [Validators.required]),
    candidateUid: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('male', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    joiningDate: new FormControl('', Validators.required),
    skills: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
    isInternal: new FormControl<Boolean>(false),
  })

  ngOnInit(): void {
    this.isAuthor = JSON.parse(sessionStorage.getItem("author") as string);

    this.GetStatusByType();

  }

  GetStatusByType() {
    this._statusService.GetStatusByType('Candidate').subscribe(result => {
      this.statusList = result;
    })
  }


  onSubmit(): void {
    console.log(this.candidateform.value);
    if (this.candidateform.valid) {
      this.candidateform.value.dob = formatDate(this.candidateform.value.dob as string, 'yyyy-MM-dd', this.locale);
      this.candidateform.value.joiningDate = formatDate(this.candidateform.value.joiningDate as string, 'yyyy-MM-dd', this.locale);
      this._candidateService.PostCandidateData(this.candidateform.value).subscribe(data => {
        alert(data);
        this.candidateform.reset();
        this.candidateform.markAsUntouched()
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
    Object.keys(this.candidateform.controls).forEach((fieldName: string) => {
      const control = this.candidateform.get(fieldName);
      if (control) {
        control.markAsUntouched();
      }
    });
  }

  canExit() {
    if (this.candidateform.dirty) {
      return confirm('You have unsaved changes. Do you really want to discard these changes?');
    }
    else {
      return true;
    }
  }

}
