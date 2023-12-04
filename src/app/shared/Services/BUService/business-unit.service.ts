import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {

  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/BusinessUnit";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  
  GetAllBUData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  PostBUdata(data: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteBUData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateBUData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetBUId(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
  
  
}
