import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecuirityService {
  apiUrl = environment.apiUrl;
  baseUrl: string =this.apiUrl+ "/Security";
  constructor(private http: HttpClient) { }

  private qns=new BehaviorSubject<any[]>([]);
  public share=this.qns.asObservable();

  getAllQuestions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  postAnswer(data: any): Observable<any> {
    console.log(data)
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  getValidateSecurityQnA(data: any): Observable<any> {
    console.log(data)
    return this.http.post<any>(`${this.baseUrl}/ValidateSecurityAnswers`,data);
  }

 
  UpdateQuestion(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetQuestionById(id:any):Observable<any>{
    
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
  GetAnswerById(param:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/SecurityAnswer`,{params:param})
  }
  GetQuestionsByLoginId(email:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetSecurityQns?emailid=${email}`);
  }
  
  StoreQuestionIds(QnsArray:any)
  {
     this.qns.next(QnsArray);
     console.log(QnsArray);
  }

  
 
}
