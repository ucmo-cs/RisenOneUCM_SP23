import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_Data } from './api-data';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

   private baseURL = 'https://zx62abb126.execute-api.us-east-2.amazonaws.com/prod';
  
   constructor(private http: HttpClient) { }

   getAllReports(): Observable<API_Data> {
    const URL = `${this.baseURL}`;
    return this.http.get<API_Data>(URL);
   }
}