import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.apiUrl;
  accountUrl: string = this.apiUrl + "/Account";
  private header = new HttpHeaders({ "content-type": "application/json" });

  constructor(private http: HttpClient) { }

  GetAllAccountData(): Observable<any> {
    return this.http.get<any>(`${this.accountUrl}`);
  }

  PostSOWDuplicateCheck(data: any): Observable<any> {
    let DATA = { 'Account': data }
    console.log(DATA)
    return this.http.post<any>(`${this.accountUrl}/Account`, DATA, { headers: this.header })
  }
  PostAccountData(data: any): Observable<any> {
    return this.http.post<any>(`${this.accountUrl}`, data);
  }
  DeleteAccountData(id: any): Observable<any> {
    return this.http.delete<any>(`${this.accountUrl}/${id}`);
  }
  UpdateAccountData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.accountUrl}/${id}`, data)
  }
  GetAccountById(id: any): Observable<any> {
    return this.http.get<any>(`${this.accountUrl}/${id}`)
  }
}
