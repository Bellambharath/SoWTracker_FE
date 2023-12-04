import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ScreeningService } from '../../shared/Services/ScreeningService/screening.service';
import { ScreeningModel } from '../../Models/ScreeningModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-screening-edit',
  templateUrl: './screening-edit.component.html',
  styleUrls: ['./screening-edit.component.css']
})
export class ScreeningEditComponent implements OnInit{
  panelOpenState = false;
  totalScreeningData:any;
  SelectedScreeningProfiles: ScreeningModel[] = [];
  RejectedScreeningProfiles: ScreeningModel[] = [];
  Onholdprofiles: ScreeningModel[] = [];

  SelectedL1Profiles: ScreeningModel[] = [];
  RejectedL1Profiles: ScreeningModel[] = [];

  SelectedL2Profiles: ScreeningModel[] = [];
  RejectedL2Profiles: ScreeningModel[] = [];
  dataLoaded: boolean = false;
  showInput: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  OnholddataSource: MatTableDataSource<any>;
  ScreeningSelecteddataSource: MatTableDataSource<any>;
  ScreeningRejecteddataSource: MatTableDataSource<any>;

  L1SelecteddataSource: MatTableDataSource<any>;
  L1RejecteddataSource: MatTableDataSource<any>;
  L2SelecteddataSource: MatTableDataSource<any>;
  L2RejecteddataSource: MatTableDataSource<any>;
  dataSource3: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['CandidateUID', 'CandidateName'];




  constructor(private screeningservice: ScreeningService, private _formBuilder: FormBuilder) { }



  ngOnInit(): void {
   
     
    // let table = new DataTable('#myTable', {
    //     responsive: true
    // });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['']
    });
    let sowid = parseInt(sessionStorage.getItem("sowid") as string);
    console.log(sowid)
    sowid = 1875
    this.screeningservice.GetScreeningDataByID(sowid).subscribe((result) => {
      console.log(result)
      this.totalScreeningData=result;
      for (var i = 0; i < result.length; i++) {
        if (result[i].isSelectedinScreening == true) {
          this.SelectedScreeningProfiles.push(result[i])
        }
        else if(result[i].isRejectedinScreening==true) {
          this.RejectedScreeningProfiles.push(result[i])
        }
        else{
          this.Onholdprofiles.push(result[i]) 
        }
      }
      if(this.SelectedScreeningProfiles.length==0)
      {
        let screening=new ScreeningModel();
        this.SelectedScreeningProfiles.push(screening);
      }
      console.log(this.SelectedScreeningProfiles)
      this.ScreeningSelecteddataSource = new MatTableDataSource(this.SelectedScreeningProfiles);
      this.ScreeningSelecteddataSource.paginator = this.paginator;
      this.ScreeningSelecteddataSource.sort = this.sort;

      this.ScreeningRejecteddataSource = new MatTableDataSource(this.RejectedScreeningProfiles);
      this.ScreeningRejecteddataSource.paginator = this.paginator;
      this.ScreeningRejecteddataSource.sort = this.sort;

      this.OnholddataSource=new MatTableDataSource(this.Onholdprofiles);
      this.OnholddataSource.paginator = this.paginator;
      this.OnholddataSource.sort = this.sort;
      console.log(this.Onholdprofiles.length)

      for (var i = 0; i < result.length; i++) {
        if (result[i].isSelectedinScreening == true && result[i].isSelectedinL1 == true) {
          this.SelectedL1Profiles.push(result[i])
        }
        if (result[i].isSelectedinScreening == true && result[i].isSelectedinL1 == false) {
          this.RejectedL1Profiles.push(result[i])
        }
      }
      this.L1SelecteddataSource = new MatTableDataSource(this.SelectedL1Profiles);
      this.L1SelecteddataSource.paginator = this.paginator;
      this.L1SelecteddataSource.sort = this.sort;
      this.L1RejecteddataSource = new MatTableDataSource(this.RejectedL1Profiles);
      this.L1RejecteddataSource.paginator = this.paginator;
      this.L1RejecteddataSource.sort = this.sort;




      for (var i = 0; i < result.length; i++) {
        if (result[i].isSelectedinL1 == true && result[i].isSelectedinL2 == true) {
          this.SelectedL2Profiles.push(result[i])
        }
        if (result[i].isSelectedinL1 == true && result[i].isSelectedinL2 == false) {
          this.RejectedL2Profiles.push(result[i])
        }
      }
      this.L2SelecteddataSource = new MatTableDataSource(this.SelectedL2Profiles);
      this.L2SelecteddataSource.paginator = this.paginator;
      this.L2SelecteddataSource.sort = this.sort;
      this.L2RejecteddataSource = new MatTableDataSource(this.RejectedL2Profiles);
      this.L2RejecteddataSource.paginator = this.paginator;
      this.L2RejecteddataSource.sort = this.sort;
      this.dataLoaded = true;

      console.log(this.L2SelecteddataSource.data)
      console.log(this.L2RejecteddataSource.data)






    })


  }
  applyFilterScreeningSelected(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.ScreeningSelecteddataSource.filter = filterValue;
  }
  applyFilterScreeningRejected(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.ScreeningRejecteddataSource.filter = filterValue;
  }

  applyFilterL1Selected(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.L1SelecteddataSource.filter = filterValue;
  }
  applyFilterL1Rejected(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.L1RejecteddataSource.filter = filterValue;
  }

  applyFilterL2Selected(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.L2SelecteddataSource.filter = filterValue;
  }
  applyFilterL2Rejected(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.L2RejecteddataSource.filter = filterValue;
  }
}
