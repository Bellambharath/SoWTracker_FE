import { TestBed } from '@angular/core/testing';
import * as FileSaver from 'file-saver';
import { ExcelService } from './excel.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExcelService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ExcelService]
    });
    service = TestBed.inject(ExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('exportAsExcelFile', () => {
     const json = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    const excelFileName = 'test-file';
    service.exportAsExcelFile(json, excelFileName);
  });

  

 
});

