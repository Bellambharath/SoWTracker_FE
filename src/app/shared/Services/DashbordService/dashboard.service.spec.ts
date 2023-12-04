import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[DashboardService]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetSODashboardData',()=>{
    const data=[
      {
        category: "Status",
        name: "Cancelled",
        count: 0
      },
      {
        category: "Status",
        name: "Closed",
        count: 0
      }]
      service.GetSODashboardData("weekly").subscribe((r)=>{
        expect(r).toBe(data)
      })
     

  })
  it('GetCandidateDashboardData',()=>{
    const data=[
      {
        category: "Status",
        name: "Cancelled",
        count: 0
      },
      {
        category: "Status",
        name: "Closed",
        count: 0
      }]
      service.GetCandidateDashboardData("weekly").subscribe((r)=>{
        expect(r).toBe(data)
      })
      
  })
  
});

