import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/ProjectManager";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  
  GetAllProjectManagerData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  } 
  GetAllManagerData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  PostManagerata(data: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteManagerData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateManagerData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetManageryId(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
 
}
