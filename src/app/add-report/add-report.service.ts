import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
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

    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    saveReport(exportBody:Report_Data): Observable<Report_Data>{
        const URL = `${this.basePOSTURL}`;
        return this.http.post<Report_Data>(URL, exportBody)
        .pipe(
          //catchError(this.handleError)
          catchError((error: any, caught: Observable<any>): Observable<any> => {
            console.error('There was an error!', error);

            return error.message;
          }
        ));
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

  updateReport(exportBody:Report_Data): Observable<Report_Data>{
    const URL = `${this.basePATCHURL}`;
    return this.http.put<Report_Data>(URL, exportBody)
    .pipe(
      catchError(this.handleError)
    );
  }

   /* updateReport(exportBody:any){
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
    }*/
}