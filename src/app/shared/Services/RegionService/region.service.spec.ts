import { TestBed } from '@angular/core/testing';

import { RegionService } from './region.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegionService', () => {
  let service: RegionService;
  let httpmock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[RegionService]
    });
    service = TestBed.inject(RegionService);
    httpmock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllRegionData',()=>{
    const data=
    [
      {
        regionId: 4,
        region: "US",
        type: ""
      },
      {
        regionId: 3,
        region: "SG",
        type: ""
      }
    ]
      service.GetAllRegionData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpmock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('GET')

  })
  it('PostRegionData',()=>{
    const data=
    {
      regionId: 3,
      region: "SG",
      type: ""
    }
      service.PostRegionData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpmock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('POST')
      req.flush(data)
    
    })
  it('DeleteRegionData',()=>{
    const data=
    {
      regionId: 3,
      region: "SG",
      type: ""
    }
      service.DeleteRegionData(data.regionId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=3
      const req=httpmock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
      
  })
  it('UpdateRegionData',()=>{
    const data=
    {
      regionId: 3,
      region: "SG",
      type: ""
    }
      service.UpdateRegionData(data.regionId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=3
      const req=httpmock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('PUT')
      req.flush(data)
  })
  it('GetRegionById',()=>{
    const data=
    {
      regionId: 3,
      region: "SG",
      type: ""
    }
      service.GetRegionById(data.regionId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=3
      const req=httpmock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('GET')
      })
});

