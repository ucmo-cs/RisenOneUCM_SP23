import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report_Data } from '/workspaces/RisenOneUCM_SP23/src/app/data-table/report_data';

export interface ResponseData{
  statusCode: string,
  body: string,
}

@Injectable({
  providedIn: 'root'
})
export class AddReportService {

    private basePOSTURL = 'https://5mom95xac0.execute-api.us-east-2.amazonaws.com/prod/Report';
  
    private basePATCHURL = `https://prhyisfts3.execute-api.us-east-2.amazonaws.com/prod/Report`;
    
    constructor(private http: HttpClient) { }

    saveReport(exportBody:any){
        const URL = `${this.basePOSTURL}`;
        this.http.post<ResponseData>(URL, exportBody)
        .subscribe(
          data =>{
            var responsedata = data;
            //console.log(responsedata.body);
            
          },
          error => alert(error),
        );
    }

    /*saveReport(exportBody:any){
      const URL = `${this.basePOSTURL}`;
      this.http.post<Report_Data>(URL, exportBody)
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
             console.log(error);
            }
      );
  }*/

    updateReport(exportBody:any){
      const URL = `${this.basePATCHURL}`;
      this.http.put<Report_Data>(URL, exportBody)
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