import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/DepartmentType";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  
  GetAllDepartmentData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  } 
  GetAllDeptData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  PostDeptdata(data: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteDeptData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateDeptData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetDeptId(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
  
}
