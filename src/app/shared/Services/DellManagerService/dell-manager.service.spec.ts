import { TestBed } from '@angular/core/testing';

import { DellManagerService } from './dell-manager.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('DellManagerService', () => {
  let service: DellManagerService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[DellManagerService]
    });
    service = TestBed.inject(DellManagerService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllDellManagerData',()=>{
    const data=[
      {
        dellManagerId: 587,
        dellManagerName: "Viswa k",
        type: ""
      },
      {
        dellManagerId: 586,
        dellManagerName: "Viswa",
        type: ""
      }]
      service.GetAllDellManagerData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const request=httpMock.expectOne(`${service.baseUrl}`)
      expect(request.request.method).toBe('GET')
      request.flush(data)
    })
    it('PostDellManagerData',()=>{
      const data=
        {
          dellManagerId: 587,
          dellManagerName: "Viswa k",
          type: ""
        }
        service.PostDellManagerData(data).subscribe((r)=>{
          expect(r).toBe(data)
        })
        const request=httpMock.expectOne(`${service.baseUrl}`)
        expect(request.request.method).toBe('POST')
        request.flush(data)
      })
      it('DeleteDellManagerData',()=>{
        const data=
        {
          dellManagerId: 587,
          dellManagerName: "Viswa k",
          type: ""
        }
        service.DeleteDellManagerData(data.dellManagerId).subscribe((r)=>{
          expect(r).toBe(data)
        })
      })
      it('UpdateDellManagerData',()=>{
        const data=
        {
          dellManagerId: 587,
          dellManagerName: "Viswa k",
          type: ""
        }
        service.UpdateDellManagerData(data.dellManagerId,data).subscribe((r)=>{
          expect(r).toBe(data)
        })
      })
      it('GetDellManagerById',()=>{
        const data=
        {
          dellManagerId: 587,
          dellManagerName: "Viswa k",
          type: ""
        }
        service.GetDellManagerById(data.dellManagerId).subscribe((r)=>{
          expect(r).toBe(data)
        })
      })
});
