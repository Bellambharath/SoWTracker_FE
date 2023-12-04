import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/Project";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  
  GetAllProjectData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  } 
  GetProjectById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
 
  PostProjectData(data: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteProjectData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateProjectData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }

  
}
