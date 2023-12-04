
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateMappingService } from '../shared/Services/CandidateMappingService/candidate-mapping.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CandidateService } from '../shared/Services/CandidateService/candidate.service';
import { SoService } from '../shared/Services/SoService/so.service';
import { StatusService } from '../shared/Services/StatusService/status.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from '../shared/Services/ExcelService/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-candidate-mapping',
  templateUrl: './candidate-mapping.component.html',
  styleUrls: ['./candidate-mapping.component.css']
})
export class CandidateMappingComponent {
  SOData: any[] = [];
  CandidateData: any[] = [];
  StatusData: any[] = [];
  MappingsList: any = [];
  MappingData: any = [];
  downloadObject: any;
  CandidateMappingData: any = [];
  Id: any = null;
  submitted: boolean = false;
  displayedColumns: string[] = ['soName', 'candidateName',
    'status'];
  dataSource!: MatTableDataSource<any>;
  selectedStatus: any = '';
  User: any;
  isAdmin: boolean = true;


  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  @ViewChild('soNameVar') soNameFilterVar: any = '';
  @ViewChild('candidateNameVar') candidateNameFilterVar: any = '';
  filteredMappingArray: any
  isFormVisible: boolean = false;

  constructor(
    private service: CandidateMappingService,
    public dialog: MatDialog, private candidateservice: CandidateService,
    private sowService: SoService,
    private statusService: StatusService,
    private excelService: ExcelService,
    private snackBar: MatSnackBar,
  ) { }
  async ngOnInit() {
    this.User = JSON.parse(sessionStorage.getItem("userData") as string);
    this.isAdmin = this.User.RoleName === "Admin" ? true : false;
    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }
    await this.GetSOData();
    await this.GetCandidateData();
    await this.GetStatusData();

    this.GetCandidateMappingData();
  }

  applyEdit(candidate: any) {

    candidate.isEditing = true;
  }

  cancelEdit(candidate: any) {
    candidate.isEditing = false;
  }
  UpdateCandidate(candidate: any) {

    this.service.UpdateCandidateMappingData(candidate.soW_CandidateId, candidate).subscribe(res => {
      candidate.isEditing = false;

      this.openSnackBar("Successfully Updated", "ok")
      this.GetCandidateMappingData();
    }, err => {
      console.log(err)
    })
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;

  }
  GetCandidateMappingData() {
    this.service.GetAllCandidateMappingData().subscribe(
      (data) => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
        this.CandidateMappingData = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      (err) => {
        console.log(err);
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px';

    const dialogRef = this.dialog.open(this.modalContent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  closeModal(): void {
    this.mapppingForm.reset(); // Reset the form
    this.markAllFieldsAsUntouched();
    this.dialog.closeAll();
  }

  mapppingForm = new FormGroup({
    candidateId: new FormControl('', [Validators.required]),
    sowId: new FormControl('', [Validators.required]),
    statusId: new FormControl('', [Validators.required])
  })

  get f() { return this.mapppingForm.controls; }

  onSubmit() {
    console.log(this.mapppingForm.value)
   
    this.submitted = true;
    if (this.mapppingForm.invalid) {
      this.markAllFieldsAsUntouched();

      return;
    }
    else {
      this.onAdd();

    }
  }


  isFieldInvalid(fieldName: string): boolean {
    const control = this.mapppingForm.get(fieldName);
    return control !== null && control.invalid && (control.touched || this.submitted);
  }

  markAllFieldsAsUntouched() {
    Object.keys(this.mapppingForm.controls).forEach(fieldName => {
      this.mapppingForm.controls[fieldName as keyof typeof this.mapppingForm.controls].markAsUntouched();
    });
  }


  onAdd() {
    let formValue = this.mapppingForm.value;
    let obj = {
      sowId: formValue.sowId,
      candidateId: formValue.candidateId,
      StatusId: formValue.statusId,
      type: "post",
    };
    this.service.PostCandidateMappingData(obj).subscribe(data => {
      alert(data);
      this.mapppingForm.reset();
      this.GetCandidateMappingData();
    })
  }

  deleteDetails(map: any) {
    this.Id = map.soW_CandidateId;
    var decision = confirm('Are you sure you want to delete?');
    if (decision) {
      this.service.DeleteCandidateMappingData(map.soW_CandidateId).subscribe(res => {
        alert(res);
        this.GetCandidateMappingData();
        this.Id = null;
      })
    }
    else {
      alert('Data not Deleted');
    }
  }



  GetSOData() {
    this.service.GetSowDataForDropDown().subscribe(data => {
      this.SOData = data;
      console.log(this.SOData)


    })
  }


  GetCandidateData() {
    return new Promise((res, rej) => {
      this.candidateservice.GetAllCandidatesData().subscribe(data => {
        this.CandidateData = data;
        console.log(data)
        res('')
      })
    })
  }

  GetStatusData() {
    return new Promise((res, rej) => {
      this.statusService.GetAllStatusData().subscribe(data => {
        this.StatusData = data;
        res('')
      })
    })
  }

  DownloadExcel() {

    let filteredData: any = []
    if (!this.filteredMappingArray) {
      filteredData = this.dataSource.filteredData;
    } else {
      filteredData = this.filteredMappingArray;
    }
    if (filteredData.length > 0) {
      let headers = ['SO Name', 'Candidate Name', 'Status']
      const downloadData = filteredData.map((data: any) => ({
        'SO Name': data.soName,
        'Candidate Name': data.candidateName,
        'Status': data.statusName
      }));

      this.excelService.jsonExportAsExcel(downloadData, "SOCandidate Mapping", headers);

    } else {
      alert('No Records found!');
    }
  }

  customFilter() {
    let filterObject: any = {
      soName: this.soNameFilterVar.nativeElement.value,
      candidateName: this.candidateNameFilterVar.nativeElement.value,
      statusName: this.selectedStatus

    }
    console.log(filterObject)
    this.filteredMappingArray = this.CandidateMappingData.filter((element: any) =>
      (filterObject.soName === '' || element.soName.toLowerCase().startsWith(filterObject.soName.toLowerCase())) &&
      (filterObject.candidateName === '' || element.candidateName.toLowerCase().startsWith(filterObject.candidateName.toLowerCase())) &&
      (filterObject.statusName === '' || element.statusName.toLowerCase().startsWith(filterObject.statusName.toLowerCase()))
    );
    this.dataSource = new MatTableDataSource(this.filteredMappingArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}