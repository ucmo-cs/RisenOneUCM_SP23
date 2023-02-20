import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StatusReport } from './statusReport';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Reports } from './Report';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

   private baseURL = 'https://zx62abb126.execute-api.us-east-2.amazonaws.com/prod';
  
   constructor(private http: HttpClient) { }

   getRandomUsers(): Observable<Reports> {
    const URL = `${this.baseURL}`;
    return this.http.get<Reports>(URL);
   }
}