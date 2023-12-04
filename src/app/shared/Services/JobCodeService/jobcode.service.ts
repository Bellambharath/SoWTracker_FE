import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobcodeService {
  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/JobCode";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  
  GetAllJobcodeData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  } 

  GetAlljobcodeData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  Postjobcodedata(data: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeletejobcodeData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdatejobcodeData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetjobcodeId(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

  
}
