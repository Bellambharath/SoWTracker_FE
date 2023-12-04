import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(private http: HttpClient) { }
  apiUrl=environment.apiUrl;
  baseUrl: string =this.apiUrl+ "/ScreeningProfile";
  GetScreeningData()
  {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  GetScreeningDataByID(id:any)
  {
   
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
}
