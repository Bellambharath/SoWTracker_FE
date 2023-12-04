import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractCategoryService {
  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/ContractCategory";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  
  GetAllContractCategoryData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  } 
  GetContractCategoryById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  GetAllCategoryData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  PostCategoryata(data: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteCategoryData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateCategoryData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetCategoryId(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

}
