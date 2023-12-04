import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('LocationService', () => {
  let service: LocationService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[LocationService]
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllLocationData',()=>{
    const data=
    [
      {
        locationId: 5,
        location: "BNG",
        regionId: 1,
        type: ""
      },
      {
        locationId: 4,
        location: "MY",
        regionId: 2,
        type: ""
      }
    ]
      service.GetAllLocationData().subscribe((r)=>{
        expect(r).toBe(data)
      })
     
  })
  it('PostLocationData',()=>{
    const data=
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
      service.PostLocationData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      
  })
  it('DeleteLocationData',()=>{
    const data=
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
      service.DeleteLocationData(data.locationId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      
  })
  it('UpdateLocationData',()=>{
    const data=
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
      service.UpdateLocationData(data.locationId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=5
     
  })
  it('GetLocationById',()=>{
    const data=
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
      service.GetLocationById(data.locationId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      
  })
});

