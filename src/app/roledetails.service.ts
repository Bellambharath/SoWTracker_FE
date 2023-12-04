import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoledetailsService {
  apiUrl=environment.apiUrl;
  baseUrl: string =this.apiUrl+ "/RoleDetails";
  constructor(private http: HttpClient) { }

  GetAllRoledetailsData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  PostRoledetailsData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteRoledetailsData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateRoledetailsData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetRoledetailsById(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
}