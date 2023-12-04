import { TestBed } from '@angular/core/testing';

import { CandidateService } from './candidate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CandidateService', () => {
  let service: CandidateService;
  let httpMock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CandidateService]
    });
    service = TestBed.inject(CandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('PostCandidateDuplicateCheck',()=>{
    const data=[{
      candidateId: 1,
      candidateName: "Deepika A",
      mobileNo: "9182737383",
      gender: "female",
      dob: "2000-04-03T00:00:00",
      email: "akuladeepika431@gmail.com",
      location: "Bangalore",
      skills: "Angular",
      joiningDate: "2023-03-03T00:00:00",
      address: "Ananthapur",
      status: "Rejected",
      pincode: "456382",
      isInternal: true
    }]
    service.PostCandidateDuplicateCheck(data).subscribe((x)=>{
      expect(x).toBe(data)
    })
  })
  it('GetAllCandidatesData',()=>{
    const data=[{
      candidateId: 1,
      candidateName: "Deepika A",
      mobileNo: "9182737383",
      gender: "female",
      dob: "2000-04-03T00:00:00",
      email: "akuladeepika431@gmail.com",
      location: "Bangalore",
      skills: "Angular",
      joiningDate: "2023-03-03T00:00:00",
      address: "Ananthapur",
      status: "Rejected",
      pincode: "456382",
      isInternal: true
    }]
    service.GetAllCandidatesData().subscribe((x)=>{
      expect(x).toBe(data)
    })
    
  })
  it('PostCandidateData',()=>{
    const data={
      candidateId: 1,
      candidateName: "Deepika A",
      mobileNo: "9182737383",
      gender: "female",
      dob: "2000-04-03T00:00:00",
      email: "akuladeepika431@gmail.com",
      location: "Bangalore",
      skills: "Angular",
      joiningDate: "2023-03-03T00:00:00",
      address: "Ananthapur",
      status: "Rejected",
      pincode: "456382",
      isInternal: true
    }
    service.PostCandidateData(data).subscribe((x)=>{
      expect(x).toBe(data)
    })
   
     
      
  })
  it('DeleteCandidateData',()=>{
    const data={
      candidateId: 1,
      candidateName: "Deepika A",
      mobileNo: "9182737383",
      gender: "female",
      dob: "2000-04-03T00:00:00",
      email: "akuladeepika431@gmail.com",
      location: "Bangalore",
      skills: "Angular",
      joiningDate: "2023-03-03T00:00:00",
      address: "Ananthapur",
      status: "Rejected",
      pincode: "456382",
      isInternal: true
    }
    service.DeleteCandidateData(data.candidateId).subscribe((x)=>{
      expect(x).toBe(data)
    })
    
  })
  it('UpdateCandidateData',()=>{
    const data={
      candidateId: 1,
      candidateName: "Deepika A",
      mobileNo: "9182737383",
      gender: "female",
      dob: "2000-04-03T00:00:00",
      email: "akuladeepika431@gmail.com",
      location: "Bangalore",
      skills: "Angular",
      joiningDate: "2023-03-03T00:00:00",
      address: "Ananthapur",
      status: "Rejected",
      pincode: "456382",
      isInternal: true
    }
    service.UpdateCandidateData(data.candidateId,data).subscribe((x)=>{
      expect(x).toBe(data)
    })
 
  })
  it('GetCandidateById',()=>{
    const data={
      candidateId: 1,
      candidateName: "Deepika A",
      mobileNo: "9182737383",
      gender: "female",
      dob: "2000-04-03T00:00:00",
      email: "akuladeepika431@gmail.com",
      location: "Bangalore",
      skills: "Angular",
      joiningDate: "2023-03-03T00:00:00",
      address: "Ananthapur",
      status: "Rejected",
      pincode: "456382",
      isInternal: true
    }
    service.GetCandidateById(data.candidateId).subscribe((x)=>{
      expect(x).toBe(data)
    })
     
  })
  it('GetCandidateByDate',()=>{
    const data={
      candidateId: 1,
      candidateName: "Deepika A",
      mobileNo: "9182737383",
      gender: "female",
      dob: "2000-04-03T00:00:00",
      email: "akuladeepika431@gmail.com",
      location: "Bangalore",
      skills: "Angular",
      joiningDate: "2023-03-03T00:00:00",
      address: "Ananthapur",
      status: "Rejected",
      pincode: "456382",
      isInternal: true
    }
    service.GetCandidateByDate(data.joiningDate,"2050/3/3").subscribe((x)=>{
      expect(x).toBe(data)
    })
  })

});
