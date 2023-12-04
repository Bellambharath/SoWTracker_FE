import { TestBed } from '@angular/core/testing';

import { UstTpmService } from './ust-tpm.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('UstTpmService', () => {
  let service: UstTpmService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UstTpmService]
    });
    service = TestBed.inject(UstTpmService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllUSTTPMData',()=>{
    const data=
      [
        {
          usttpmId: 69,
          usttpmName: "Udaya Punnani",
          type: ""
        },
        {
          usttpmId: 68,
          usttpmName: "Chand Shaik",
          type: ""
        }]
      service.GetAllUSTTPMData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('GET')
  })
  it('PostUSTTPMData',()=>{
    const data=
    {
      usttpmId: 69,
      usttpmName: "Udaya Punnani",
      type: ""
    }
      service.PostUSTTPMData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('POST')
  })
  it('DeleteUSTTPMData',()=>{
    const data=
    {
      usttpmId: 69,
      usttpmName: "Udaya Punnani",
      type: ""
    }
      service.DeleteUSTTPMData(data.usttpmId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=69
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
  })
  it('UpdateUSTTPMData',()=>{
    const data=
    {
      usttpmId: 69,
      usttpmName: "Udaya Punnani",
      type: ""
    }
      service.UpdateUSTTPMData(data.usttpmId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=69
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('PUT')
      req.flush(data)
  })
  it('GetUSTTPMById',()=>{
    const data=
    {
      usttpmId: 69,
      usttpmName: "Udaya Punnani",
      type: ""
    }
      service.GetUSTTPMById(data.usttpmId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=69
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('GET')
  })
});

