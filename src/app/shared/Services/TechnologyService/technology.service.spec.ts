import { TestBed } from '@angular/core/testing';

import { TechnologyService } from './technology.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TechnologyService', () => {
  let service: TechnologyService;
  let httpmock:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[TechnologyService]
    });
    service = TestBed.inject(TechnologyService);
    httpmock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllTechData',()=>{
    const data=
    [
      {
        technologyId: 188,
        technologyName: "XSLT and XSLFO ",
        domainId: 6,
        type: "",
        domainName: "Others"
      },
      {
        technologyId: 187,
        technologyName: "XQUERY Dev",
        domainId: 11,
        type: "",
        domainName: "App Dev"
      }]
      service.GetAllTechData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const request=httpmock.expectOne(`${service.baseUrl}`)
      expect(request.request.method).toBe('GET')
   
  })
  it('PostTechData',()=>{
    const data=
    {
      technologyId: 188,
      technologyName: "XSLT and XSLFO ",
      domainId: 6,
      type: "",
      domainName: "Others"
    }
      service.PostTechData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpmock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('POST')
      req.flush(data)
  })
  it('DeleteTechData',()=>{
    const data=
    {
      technologyId: 188,
      technologyName: "XSLT and XSLFO ",
      domainId: 6,
      type: "",
      domainName: "Others"
    }
      service.DeleteTechData(data.technologyId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=188
      const req=httpmock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')

  })
  it('UpdateTechData',()=>{
    const data=
    {
      technologyId: 188,
      technologyName: "XSLT and XSLFO ",
      domainId: 6,
      type: "",
      domainName: "Others"
    }
      service.UpdateTechData(data.technologyId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=188
      const req=httpmock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('PUT')
      req.flush(data)
  })
  it('GetTechById',()=>{
    const data=
    {
      technologyId: 188,
      technologyName: "XSLT and XSLFO ",
      domainId: 6,
      type: "",
      domainName: "Others"
    }
      service.GetTechById(data.technologyId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      
  })
});
