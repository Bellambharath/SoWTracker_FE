import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiUrl=environment.apiUrl;
  baseUrl: string = this.apiUrl+"/Location";
  constructor(private http: HttpClient) { }

  GetAllLocationData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  GetLocationByRegionId(id:any): Observable<any> {
    let Id:number=parseInt(id);
    return this.http.get<any>(`${this.baseUrl}/getbyregion?id=`+Id);
  }
  PostLocationData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  DeleteLocationData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  UpdateLocationData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetLocationById(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
}
