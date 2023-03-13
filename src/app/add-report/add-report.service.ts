import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report_Data } from '/workspaces/RisenOneUCM_SP23/src/app/data-table/report_data';

@Injectable({
  providedIn: 'root'
})
export class AddReportService {

    private baseURL = 'https://5mom95xac0.execute-api.us-east-2.amazonaws.com/prod';
  
    constructor(private http: HttpClient) { }

    saveReport(exportBody:any){
        const URL = `${this.baseURL}`;
        this.http.post<Report_Data>(URL, exportBody)
        .subscribe(
          res => {
            console.log(res);
          },
          error => {
               console.log(error);
              }
        );
    }
}