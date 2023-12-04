import { TestBed } from '@angular/core/testing';

import { UstPocService } from './ust-poc.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('UstPocService', () => {
  let service: UstPocService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UstPocService]
    });
    service = TestBed.inject(UstPocService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllUstPocData',()=>{
    const data=
    [
      {
        ustpocId: 42,
        ustpocName: "Rakshitha B / MoonRaft",
        type: ""
      },
      {
        ustpocId: 41,
        ustpocName: "Jaya/Kanika",
        type: ""
      }]
      service.GetAllUstPocData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('GET')

  })
  it('PostUstPocData',()=>{
    const data=
    {
      ustpocId: 42,
      ustpocName: "Rakshitha B / MoonRaft",
      type: ""
    }
      service.PostUstPocData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('POST')
  })
  it('DeleteUstPocData',()=>{
    const data=
    {
      ustpocId: 42,
      ustpocName: "Rakshitha B / MoonRaft",
      type: ""
    }
      service.DeleteUstPocData(data.ustpocId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=42
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
  })
  it('UpdateUstPocData',()=>{
    const data=
    {
      ustpocId: 42,
      ustpocName: "Rakshitha B / MoonRaft",
      type: ""
    }
      service.UpdateUstPocData(data.ustpocId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=42
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('PUT')
      req.flush(data)
  })
  it('GetUstPocById',()=>{
    const data=
    {
      ustpocId: 42,
      ustpocName: "Rakshitha B / MoonRaft",
      type: ""
    }
      service.GetUstPocById(data.ustpocId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=42
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('GET')
  })
});
