import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx/types';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
  constructor() {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  public jsonExportAsExcel(json: any[], excelFileName: string, headers: string[]): void {
    const worksheet: WorkSheet = XLSX.utils.json_to_sheet(json, { header: headers });
    worksheet['!cols'] = [];

    const wb: WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  private isObject(values: any): boolean {
    return !Array.isArray(values);
  }

  private getKeys(object: any[] | null): string[] {
    if (object != null) {
      const headers = Object.keys(object).map((x) => x.toUpperCase());
      return headers;
    } else {
      return [];
    }
  }

  private isValue(value: any): boolean {
    return typeof value !== 'object';
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  public exportEmptyExcelFile(excelFileName: string, headers: string[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{}], { header: headers });
    worksheet['!cols'] = headers.map((_, index) => ({ wch: 15 })); // Adjust the column widths as needed
  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
}
