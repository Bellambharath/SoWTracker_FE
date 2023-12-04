
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NavigationExtras, ROUTES, Router } from '@angular/router';
import { UstTpmService } from '../shared/Services/UsttpmService/ust-tpm.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-tpm',
  templateUrl: './tpm.component.html',
  styleUrls: ['./tpm.component.css']
})
export class TPMComponent implements OnInit {
  @ViewChild('inputFilter') inputFilter: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  TpmName: string = "";
  TPMProjectData:any;
  displayedColumns = ['ProjectID', 'DellManagerName', 'ProjectDescription'];
  dataSource: MatTableDataSource<any>;

  
  constructor(private usttpmservice: UstTpmService,private router: Router) { }

  ngOnInit(): void {
    let data = sessionStorage.getItem('userData')
    let userdata = (data) ? JSON.parse(data) : null
    this.TpmName = userdata.LoginName
    console.log(this.TpmName);
    this.GetUstTPMID();


  }
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }
  GetUstTPMID() {

    this.usttpmservice.GetUSTTPMByTPMName(this.TpmName).subscribe((result) => {
      
      this.TPMProjectData=result;
      this.dataSource = new MatTableDataSource(this.TPMProjectData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
    },
      (error) => {
        console.error('Error:', error);
      }
    )

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onRowClick(row: any) {
    
    const projectId = row.projectId;
    const encodedRow = btoa(JSON.stringify(row));

  this.router.navigate(['/Billing'], {
    queryParams: { projectdetails: encodedRow },
  });
   
    
  
  }


}
