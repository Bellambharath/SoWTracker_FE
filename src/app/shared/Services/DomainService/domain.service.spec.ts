import { TestBed } from '@angular/core/testing';

import { DomainService } from './domain.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DomainService', () => {
  let service: DomainService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[DomainService]
    });
    service = TestBed.inject(DomainService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllDomainData',()=>{
    const data=[
      {
        domainId: 12,
        domainName: "EBI/DWH",
        type: ""
      },
      {
        domainId: 11,
        domainName: "App Dev",
        type: ""
      }]
      service.GetAllDomainData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('GET')
  })
  it('PostDomainData',()=>{
    const data=
      {
        domainId: 12,
        domainName: "EBI/DWH",
        type: ""
      }
      service.PostDomainData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
    
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('POST')
     
  })
  it('DeleteDomainData',()=>{
    const data=
      {
        domainId: 12,
        domainName: "EBI/DWH",
        type: ""
      }
      service.DeleteDomainData(data.domainId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=12
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
  })
  it('UpdateDomainData',()=>{
    const data=
      {
        domainId: 12,
        domainName: "EBI/DWH",
        type: ""
      }
      service.UpdateDomainData(data.domainId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=12
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('PUT')
      req.flush(data)
  })
  it('GetDomainById',()=>{
    const data=
      {
        domainId: 12,
        domainName: "EBI/DWH",
        type: ""
      }
      
      service.GetDomainById(data.domainId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=12
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('GET')
  })
});
