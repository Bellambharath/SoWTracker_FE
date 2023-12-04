import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  apiUrl=environment.apiUrl;
  baseUrl: string =this.apiUrl+ "/Billing";
  constructor(private http: HttpClient) { }

  GetAllBillingData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  PostBillingData(data: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteBillingData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateBillingData(id: any, data: any): Observable<any> {
    console.log(id)
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetBillingById(projectid:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${projectid}`)
  }


}
