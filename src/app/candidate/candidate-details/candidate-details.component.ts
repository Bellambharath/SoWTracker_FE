import { Component, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { CandidateService } from 'src/app/shared/Services/CandidateService/candidate.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as XLSX from "xlsx";
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, formatDate } from '@angular/common';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';
import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})

export class CandidateDetailsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['candidateUid', 'candidateName', 'dob', 'mobileNo', 'email',
    'gender', 'skills', 'joiningDate', 'location', 'address',
    'pincode', 'status', 'isInternal'];
  dataSource!: MatTableDataSource<any>;

  file: File;
  arrayBuffer: any;
  filelist: any;
  isEditing: boolean = false;
  isAuthor: any;
  candidatesList: any;
  statusList: any;
  filteredCandidates: any[];
  downloadData: any = [];
  isInternal: string;
  downloadObject: any;
  isFormVisible: boolean = false;
  User: any;
  IsAccessToEdit: boolean = true;
  maxDate: Date;

  constructor(
    private _candidateService: CandidateService,
    @Inject(LOCALE_ID) public locale: string,
    private _excelService: ExcelService,
    public _statusService: StatusService,
    private _router: Router,
    private snackBar: MatSnackBar,

  ) { this.maxDate = new Date() }
  ngOnInit(): void {
   
    this.User = JSON.parse(sessionStorage.getItem("userData") as string);
    this.IsAccessToEdit = this.User.PermissionName === "Edit" ? true : false;
    console.log(this.IsAccessToEdit)
    if (this.IsAccessToEdit) {
      this.displayedColumns.push('actions');
    }
    this.isAuthor = JSON.parse(sessionStorage.getItem("author") as string);
    this.GetCandidateData();
    // this.filteredCandidates = this.candidatesList
    this.GetStatusByType();


  }

  exportEmptyExcel() {
    const headers = [
      'DomainName',
      'JRCode',
      'RequestCreationDate',
      'Onboardingdate',
      'AccountName',
      'TechnologyName',
      'Role',
      'Region',
      'Location',
      'TargetOpenPositions',
      'PositionsTobeClosed',
      'USTPOCName',
      'RecruiterName',
      'USTTPMName',
      'DellManagerName',
      'StatusName',
      'Band',
      'ProjectId',
      'AccountManager',
      'ExternalResource',
      'InternalResource'
    ];

    this._excelService.exportEmptyExcelFile('CandidateTemplateExcel', headers);
  }

  GetCandidateData() {
    this._candidateService.GetAllCandidatesData().subscribe(
      (data) => {
        // console.log(data)

        this.candidatesList = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // console.log(this.dataSource.filteredData)

      },
      (err) => {
        console.log(err);
      }
    );
  }

  GetStatusByType() {
    this._statusService.GetStatusByType('Candidate').subscribe(result => {
      this.statusList = result;
    })
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;

  }
  // FIlter
  filterForm = new FormGroup({
    candidateUid: new FormControl(''),
    candidateName: new FormControl(''),
    dobFrom: new FormControl(''),
    dobTo: new FormControl(''),
    gender: new FormControl(''),
    status: new FormControl(''),
    joiningDateFrom: new FormControl(''),
    joiningDateTo: new FormControl(''),
    skills: new FormControl(''),
    location: new FormControl(''),
    isInternal: new FormControl(''),
    address: new FormControl(''),
    pincode: new FormControl(''),
    mobileNo: new FormControl(''),
    email: new FormControl(''),
  })

  restCustomFilter() {
    this.filterForm.reset()
    this.customFilter()
    this.toggleFormVisibility()
  }
  clearFormField(fieldName: string): void {
    this.filterForm.get(fieldName)?.setValue('');
    this.customFilter()
  }



  customFilter(): void {
    let uidFilter = this.filterForm.value.candidateUid;
    let candidateNameFilter = this.filterForm.value.candidateName;
    let genderFilter = this.filterForm.value.gender;
    let statusFilter = this.filterForm.value.status;
    let skillsFilter = this.filterForm.value.skills;
    let locationFilter = this.filterForm.value.location;
    let isInternalFilter = this.filterForm.value.isInternal;
    let dobFromFilter = this.filterForm.value.dobFrom;
    let dobToFilter = this.filterForm.value.dobTo;
    let joiningDateFromFilter = this.filterForm.value.joiningDateFrom;
    let joiningDateToFilter = this.filterForm.value.joiningDateTo;


    this.filteredCandidates = this.candidatesList.filter((item: any) => {

      if (uidFilter && !item.candidateUid.startsWith(uidFilter)) {
        return false;

      }



      if (candidateNameFilter && !item.candidateName.toLowerCase().startsWith(candidateNameFilter.toLowerCase())) {
        return false;
      }
      if (genderFilter && item.gender.toLowerCase() !== genderFilter.toLowerCase()) {
        return false;
      }

      if (statusFilter && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      if (skillsFilter && !item.skills.toLowerCase().includes(skillsFilter.toLowerCase())) {
        return false;
      }

      if (locationFilter && !item.location.toLowerCase().startsWith(locationFilter.toLowerCase())) {
        return false;
      }

      if (isInternalFilter !== null && isInternalFilter !== undefined) {
        if (isInternalFilter && (isInternalFilter === 'true' && !item.isInternal) || (isInternalFilter === 'false' && item.isInternal)) {
          return false;
        }
      }

      if (dobFromFilter && dobToFilter && !((new Date(item.dob) >= new Date(dobFromFilter)) && (new Date(item.dob) <= new Date(dobToFilter)))) {
        return false;
      }

      if (joiningDateFromFilter && joiningDateToFilter && !((new Date(item.joiningDate) >= new Date(joiningDateFromFilter)) && (new Date(item.joiningDate) <= new Date(joiningDateToFilter)))) {
        return false;
      }
      return true;
    });

    // console.table(filteredArray)
    this.dataSource = new MatTableDataSource(this.filteredCandidates);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  UpdateCandidateData(item: any) {
    if (item) {
      item.isEditing = false;
      delete item.isEditing;
      item.dob = (this.formatdate(item.dob) + "T00:00:00.00Z")
      item.joiningDate = (this.formatdate(item.joiningDate) + "T00:00:00.00Z");
      // console.log(item)
    }
    this._candidateService.UpdateCandidateData(item.candidateId, item).subscribe(
      (data) => {
        this.openSnackBar("Successfully Updated", "ok")

      },
      (err) => {
        console.log(err);
      }
    )
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  DownloadExcel() {
    let filteredData: any = []
    if (!this.filteredCandidates) {
      filteredData = this.dataSource.filteredData;
    } else {
      filteredData = this.filteredCandidates;
    }
    if (filteredData.length > 0) {
      let headers = [
        "Candidate UID",
        "Candidate Name",
        "Mobile No",
        "Gender",
        "DOB",
        "Email",
        "Location",
        "Skills",
        "Joining Date",
        "Address",
        "Status",
        "Pincode",
        "isInternal",
      ];
      const downloadData = filteredData.map((data: any) => ({
        "Candidate UID": data.candidateUid,
        "Candidate Name": data.candidateName,
        "Mobile No": data.mobileNo,
        "Gender": data.gender,
        "DOB": data.dob,
        "Email": data.email,
        "Location": data.location,
        "Skills": data.skills,
        "Joining Date": data.joiningDate,
        "Address": data.address,
        "Status": data.status,
        "Pincode": data.pincode,
        "isInternal": data.isInternal ? this.isInternal = "Yes" : this.isInternal = "No"

      }));

      this._excelService.jsonExportAsExcel(downloadData, "Candidate Details", headers);

    } else {
      alert('No Records found!');
    }
  }
  inputDate1: any;

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.filelist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // console.table(this.filelist)

      this.filelist.forEach((element: any) => {
        element.CandidateUid = JSON.stringify(element.CandidateUid);
        element.MobileNo = JSON.stringify(element.MobileNo);
        element.Pincode = JSON.stringify(element.Pincode);
        element.isInternal = element.isInternal.toLowerCase() === 'yes' ? true : false;
        // const serialNumber1 = element.DOB;
        // element.DOB = new Date(XLSX.SSF.format('yyyy-mm-dd', serialNumber1));
        // const serialNumber2 = element.JoiningDate;
        // element.JoiningDate = new Date(XLSX.SSF.format('yyyy-mm-dd', serialNumber2));
      });


      console.table(this.filelist)

      this._candidateService.PostCandidateDuplicateCheck(this.filelist).subscribe((x) => {
        alert(x);
        event.target.value = ''
        this.GetCandidateData()
      }, 
      err => event.target.value = ''
      // err=> console.log(err)
      );
    };
  }

  deleteDetails(candidate: any) {
    if (confirm("Do you want to delete record of " + candidate.candidateName)) {
      this._candidateService.DeleteCandidateData(candidate.candidateId).subscribe((res) => {
        alert(res);
        this.GetCandidateData();
      });
    }

  }

  formatdate(date: any) {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }



}
