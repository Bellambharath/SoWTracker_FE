import { TestBed } from '@angular/core/testing';

import { RecruiterService } from './recruiter.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('RecruiterService', () => {
  let service: RecruiterService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[RecruiterService]
    });
    service = TestBed.inject(RecruiterService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GetAllRecruiterData',()=>{
    const data=
    [
      {
        recruiterId: 31,
        recruiterName: "Varnitha",
        type: ""
      },
      {
        recruiterId: 30,
        recruiterName: "Sumant G",
        type: ""
      }
    ]
      service.GetAllRecruiterData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const obj=httpMock.expectOne(`${service.baseUrl}`)
      expect(obj.request.method).toBe('GET')

  })
  it('PostRecruiterData',()=>{
    const data=
    {
      recruiterId: 31,
      recruiterName: "Varnitha",
      type: ""
    }
      service.PostRecruiterData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const obj=httpMock.expectOne(`${service.baseUrl}`)
      expect(obj.request.method).toBe('POST')
      obj.flush(data)
  })
  it('DeleteRecruiterData',()=>{
    const data=
    {
      recruiterId: 31,
      recruiterName: "Varnitha",
      type: ""
    }
      service.DeleteRecruiterData(data.recruiterId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=31
      const obj=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(obj.request.method).toBe('DELETE')
  })
  it('UpdateRecruiterData',()=>{
    const data=
    {
      recruiterId: 31,
      recruiterName: "Varnitha",
      type: ""
    }
      service.UpdateRecruiterData(data.recruiterId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=31
      const obj=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(obj.request.method).toBe('PUT')
      obj.flush(data)
  })
  it('GetRecruiterById',()=>{
    const data=
    {
      recruiterId: 31,
      recruiterName: "Varnitha",
      type: ""
    }
      service.GetRecruiterById(data.recruiterId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=31
      const obj=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(obj.request.method).toBe('GET')
  })
});
