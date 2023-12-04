import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/Employee";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  
  GetAllEmployeeData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  } 
  GetEmployeeById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  
}
