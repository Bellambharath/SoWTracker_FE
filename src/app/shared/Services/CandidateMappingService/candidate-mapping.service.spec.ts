import { TestBed } from '@angular/core/testing';

import { CandidateMappingService } from './candidate-mapping.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('CandidateMappingService', () => {
  let service: CandidateMappingService;
  let httpMock:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[CandidateMappingService]
    });
    service = TestBed.inject(CandidateMappingService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllCandidateMappingData',()=>{
    const data=[{
      soW_CandidateId: 2,
      sowId: 6,
      candidateId: 5,
      statusId: 2,
      type: "",
      soName: "prathyusha123",
      candidateName: "prathyushareddy12",
      statusName: "Declined"
    },
    {
      soW_CandidateId: 1,
      sowId: 7,
      candidateId: 7,
      statusId: 2,
      type: "",
      soName: "sahith",
      candidateName: "bharath",
      statusName: "Declined"
    }]
    service.GetAllCandidateMappingData().subscribe((r)=>{
      expect(r).toBe(data)
    })
    const request=httpMock.expectOne(`${service.baseUrl}`)
    expect(request.request.method).toBe('GET')
    request.flush(data)
  })
  it('PostCandidateMappingData',()=>{
    const data={ soW_CandidateId: 1,
      sowId: 7,
      candidateId: 7,
      statusId: 2,
      type: "",
      soName: "sahith",
      candidateName: "bharath",
      statusName: "Declined"}
 
  service.PostCandidateMappingData(data).subscribe((r)=>{
    expect(r).toBe(data)
  })
  const request=httpMock.expectOne(`${service.baseUrl}`)
  expect(request.request.method).toBe('POST')
  request.flush(data)
})
it('DeleteCandidateMappingData',()=>{
  const data=
  { 
    soW_CandidateId: 1,
    sowId: 7,
    candidateId: 7,
    statusId: 2,
    type: "",
    soName: "sahith",
    candidateName: "bharath",
    statusName: "Declined"
  }
  service.DeleteCandidateMappingData(data.soW_CandidateId).subscribe((r)=>{
    expect(r).toBe(data)
  })
  const id=1
  const request=httpMock.expectOne(`${service.baseUrl}/${id}`)
  expect(request.request.method).toBe('DELETE')
})
it('UpdateCandidateMappingData',()=>{
  const data=
  { 
    soW_CandidateId: 1,
    sowId: 7,
    candidateId: 7,
    statusId: 2,
    type: "",
    soName: "sahith",
    candidateName: "bharath",
    statusName: "Declined"
  }
  service.UpdateCandidateMappingData(data.soW_CandidateId,data).subscribe((r)=>{
    expect(r).toBe(data)
  })
  const id=1
  const request=httpMock.expectOne(`${service.baseUrl}/${id}`)
  expect(request.request.method).toBe('PUT')
})
  it('GetCandidateById',()=>{
    const data=
    { 
      soW_CandidateId: 1,
      sowId: 7,
      candidateId: 7,
      statusId: 2,
      type: "",
      soName: "sahith",
      candidateName: "bharath",
      statusName: "Declined"
    }
    service.GetCandidateById(data.soW_CandidateId).subscribe((r)=>{
      expect(r).toBe(data)
    })
    const id=1
    const request=httpMock.expectOne(`${service.baseUrl}/${id}`)
    expect(request.request.method).toBe('GET')
})

});

