import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl=environment.apiUrl;
  baseUrl: string =this.apiUrl+ "/Login";
  loginUrl:string=this.baseUrl+"/GetLoginDetails";

  constructor(private http: HttpClient) { }

  isAuthor:boolean=false;

  GetUserData(httpParams:HttpParams): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`,{ params: httpParams });
  }
  PutUserData(loginName: string | null,data: { FailureAttempts: number; }): Observable<any> {
    return this.http.put<any>(this.baseUrl+"/" +loginName,data);
  }
  GetLoginData(){
    return this.http.get<any>(`${this.loginUrl}`).pipe(
      map(response => {
      }

      ))
    }

    UpdateIsLock(id: any, data: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/${id}`, data)
    }

}
