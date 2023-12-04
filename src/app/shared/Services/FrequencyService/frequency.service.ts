import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/Frequency";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  
  GetAllFrequencyData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  } 

  GetAllFreqData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  PostFreqdata(data: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteFreqData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateFreqData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetFreqId(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

}
