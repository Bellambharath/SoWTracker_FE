import { TestBed } from '@angular/core/testing';

import { SoService } from './so.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SoService', () => {
  let service: SoService;
  let httpmock:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[SoService]
    });
    service = TestBed.inject(SoService);
    httpmock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllSowData',()=>{
    const data=
    [
      {
        sowId: 13,
        soName: "prathyusha",
        jrCode: "1234",
        requestCreationDate: "2023-04-04T13:06:55.02",
        accountId: 4,
        technologyId: 180,
        role: "Developer",
        locationId: 2,
        regionId: 3,
        targetOpenPositions: 1,
        positionsTobeClosed: 1,
        ustpocId: 41,
        recruiterId: 28,
        usttpmId: 63,
        dellManagerId: 577,
        statusId: 2,
        band: "A",
        projectId: "123",
        accountManager: "mahesh",
        externalResource: "bhagya",
        internalResource: "bhagya",
        type: "",
        technologyName: "Validation Eng",
        accountName: "DL-MY",
        location: "HYD",
        region: "SG",
        ustpocName: "Jaya/Kanika",
        recruiterName: "Srivani Doli",
        usttpmName: "Vijay Kumar",
        dellManagerName: "Vinitha",
        statusName: "Declined"
      },
      {
        sowId: 12,
        soName: "test12353456tred",
        jrCode: "14",
        requestCreationDate: "2023-04-04T13:26:08.807",
        accountId: 3,
        technologyId: 175,
        role: "admin",
        locationId: 3,
        regionId: 3,
        targetOpenPositions: 1,
        positionsTobeClosed: 1,
        ustpocId: 37,
         recruiterId: 27,
        usttpmId: 66,
        dellManagerId: 573,
        statusId: 3,
        band: "A",
        projectId: "dhhef",
        accountManager: "mahesh",
        externalResource: "test1",
        internalResource: "chaithra",
        type: "",
        technologyName: "UI-Front end",
        accountName: "DL-USTI",
        location: "SG",
        region: "SG",
        ustpocName: "Selva",
        recruiterName: "Srinivas",
        usttpmName: "Lakshmi Narasimha Rao Kovuru",
        dellManagerName: "Vikranth",
        statusName: "Closed"
      }]
      service.GetAllSowData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const request=httpmock.expectOne(`${service.baseUrl}`)
      expect(request.request.method).toBe('GET')
     
  })
  it('PostSOWDuplicateCheck',()=>{
    const data=
    {
      sowId: 13,
      soName: "prathyusha",
      jrCode: "1234",
      requestCreationDate: "2023-04-04T13:06:55.02",
      accountId: 4,
      technologyId: 180,
      role: "Developer",
      locationId: 2,
      regionId: 3,
      targetOpenPositions: 1,
      positionsTobeClosed: 1,
      ustpocId: 41,
      recruiterId: 28,
      usttpmId: 63,
      dellManagerId: 577,
      statusId: 2,
      band: "A",
      projectId: "123",
      accountManager: "mahesh",
      externalResource: "bhagya",
      internalResource: "bhagya",
      type: "",
      technologyName: "Validation Eng",
      accountName: "DL-MY",
      location: "HYD",
      region: "SG",
      ustpocName: "Jaya/Kanika",
      recruiterName: "Srivani Doli",
      usttpmName: "Vijay Kumar",
      dellManagerName: "Vinitha",
      statusName: "Declined"
    }
      service.PostSOWDuplicateCheck(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      
  })
  it('PostSowData',()=>{
    const data=
    {
      sowId: 13,
      soName: "prathyusha",
      jrCode: "1234",
      requestCreationDate: "2023-04-04T13:06:55.02",
      accountId: 4,
      technologyId: 180,
      role: "Developer",
      locationId: 2,
      regionId: 3,
      targetOpenPositions: 1,
      positionsTobeClosed: 1,
      ustpocId: 41,
      recruiterId: 28,
      usttpmId: 63,
      dellManagerId: 577,
      statusId: 2,
      band: "A",
      projectId: "123",
      accountManager: "mahesh",
      externalResource: "bhagya",
      internalResource: "bhagya",
      type: "",
      technologyName: "Validation Eng",
      accountName: "DL-MY",
      location: "HYD",
      region: "SG",
      ustpocName: "Jaya/Kanika",
      recruiterName: "Srivani Doli",
      usttpmName: "Vijay Kumar",
      dellManagerName: "Vinitha",
      statusName: "Declined"
    }
      service.PostSowData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const request=httpmock.expectOne(`${service.baseUrl}`)
      expect(request.request.method).toBe('POST')
      request.flush(data)
  })
  it('DeleteSowData',()=>{
    const data=
    {
      sowId: 13,
      soName: "prathyusha",
      jrCode: "1234",
      requestCreationDate: "2023-04-04T13:06:55.02",
      accountId: 4,
      technologyId: 180,
      role: "Developer",
      locationId: 2,
      regionId: 3,
      targetOpenPositions: 1,
      positionsTobeClosed: 1,
      ustpocId: 41,
      recruiterId: 28,
      usttpmId: 63,
      dellManagerId: 577,
      statusId: 2,
      band: "A",
      projectId: "123",
      accountManager: "mahesh",
      externalResource: "bhagya",
      internalResource: "bhagya",
      type: "",
      technologyName: "Validation Eng",
      accountName: "DL-MY",
      location: "HYD",
      region: "SG",
      ustpocName: "Jaya/Kanika",
      recruiterName: "Srivani Doli",
      usttpmName: "Vijay Kumar",
      dellManagerName: "Vinitha",
      statusName: "Declined"
    }
      service.DeleteSowData(data.statusId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=2
      const request=httpmock.expectOne(`${service.baseUrl}/${id}`)
      expect(request.request.method).toBe('DELETE')
     
  })
  it('UpdateSowData',()=>{
    const data=
    {
      sowId: 13,
      soName: "prathyusha",
      jrCode: "1234",
      requestCreationDate: "2023-04-04T13:06:55.02",
      accountId: 4,
      technologyId: 180,
      role: "Developer",
      locationId: 2,
      regionId: 3,
      targetOpenPositions: 1,
      positionsTobeClosed: 1,
      ustpocId: 41,
      recruiterId: 28,
      usttpmId: 63,
      dellManagerId: 577,
      statusId: 2,
      band: "A",
      projectId: "123",
      accountManager: "mahesh",
      externalResource: "bhagya",
      internalResource: "bhagya",
      type: "",
      technologyName: "Validation Eng",
      accountName: "DL-MY",
      location: "HYD",
      region: "SG",
      ustpocName: "Jaya/Kanika",
      recruiterName: "Srivani Doli",
      usttpmName: "Vijay Kumar",
      dellManagerName: "Vinitha",
      statusName: "Declined"
    }
      service.UpdateSowData(data.statusId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=2
      const request=httpmock.expectOne(`${service.baseUrl}/${id}`)
      expect(request.request.method).toBe('PUT')
  })
  it('GetSowById',()=>{
    const data=
    {
      sowId: 13,
      soName: "prathyusha",
      jrCode: "1234",
      requestCreationDate: "2023-04-04T13:06:55.02",
      accountId: 4,
      technologyId: 180,
      role: "Developer",
      locationId: 2,
      regionId: 3,
      targetOpenPositions: 1,
      positionsTobeClosed: 1,
      ustpocId: 41,
      recruiterId: 28,
      usttpmId: 63,
      dellManagerId: 577,
      statusId: 2,
      band: "A",
      projectId: "123",
      accountManager: "mahesh",
      externalResource: "bhagya",
      internalResource: "bhagya",
      type: "",
      technologyName: "Validation Eng",
      accountName: "DL-MY",
      location: "HYD",
      region: "SG",
      ustpocName: "Jaya/Kanika",
      recruiterName: "Srivani Doli",
      usttpmName: "Vijay Kumar",
      dellManagerName: "Vinitha",
      statusName: "Declined"
    }
      service.GetSowById(data.statusId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=2
      const request=httpmock.expectOne(`${service.baseUrl}/${id}`)
      expect(request.request.method).toBe('GET')
  })
  it('GetSOByDate',()=>{
    const data=
    {
      sowId: 13,
      soName: "prathyusha",
      jrCode: "1234",
      requestCreationDate: "2023-04-04T13:06:55.02",
      accountId: 4,
      technologyId: 180,
      role: "Developer",
      locationId: 2,
      regionId: 3,
      targetOpenPositions: 1,
      positionsTobeClosed: 1,
      ustpocId: 41,
      recruiterId: 28,
      usttpmId: 63,
      dellManagerId: 577,
      statusId: 2,
      band: "A",
      projectId: "123",
      accountManager: "mahesh",
      externalResource: "bhagya",
      internalResource: "bhagya",
      type: "",
      technologyName: "Validation Eng",
      accountName: "DL-MY",
      location: "HYD",
      region: "SG",
      ustpocName: "Jaya/Kanika",
      recruiterName: "Srivani Doli",
      usttpmName: "Vijay Kumar",
      dellManagerName: "  ",
      statusName: "Declined"
    }
      service.GetSOByDate("2023/03/01","2023/04/01").subscribe((r)=>{
        expect(r).toBe(data)
      })
      const StartDate="2023/03/01"
      const EndDate="2023/04/01"
      const request=httpmock.expectOne(`${service.baseUrl}/GetDate?StartDate=${StartDate}&EndDate=${EndDate}`)
      expect(request.request.method).toBe('GET')
  })

});
