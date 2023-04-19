import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_Data } from './api-data';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

   private baseURL = 'https://mbtjc0scc3.execute-api.us-east-2.amazonaws.com/dev/list-reports';
   //'https://zx62abb126.execute-api.us-east-2.amazonaws.com/prod/Reports';

   private baseURLForAccountList = 'https://mbtjc0scc3.execute-api.us-east-2.amazonaws.com/dev/list-reports-for-account';
  
   constructor(private http: HttpClient) { }

   getAllReports(): Observable<API_Data> {
    const URL = `${this.baseURL}`;
    return this.http.get<API_Data>(URL);
   }

   getAllReportsForAccount(account_id: any): Observable<API_Data>{
    let headers = new HttpHeaders(
      { 
        'account_id': String(account_id),
      }  
      );
    
    const URL = `${this.baseURLForAccountList}`;
    return this.http.get<API_Data>(URL, {'headers': headers});
   }
}