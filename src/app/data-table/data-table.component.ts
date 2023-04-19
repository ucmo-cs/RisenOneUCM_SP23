import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, last } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataTableService } from './data-table.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Report_Data } from './report_data';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {AddReportComponent} from '../add-report/add-report.component';
import {MatIconModule} from '@angular/material/icon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDF_FormatComponent } from '../pdf-format/pdf-format.component';
import { AddReportService } from '../add-report/add-report.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  displayedColumns: any[] = ['date','projects','report_status',];
  public dataSource: MatTableDataSource<Report_Data>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;
  private globalCount: number;
  private globalLastDate: Date;

  toggleLayer = false;

  constructor(private reportService: DataTableService,
    private addreportService: AddReportService, private matDialog: MatDialog) { }

  ngOnInit() {
    /*Initialization of data table*/

    let id = "Null";

      if(localStorage.getItem("account_id") != null){
        
        id = localStorage.getItem("account_id")!;
        //console.log(id);
      }
    
    this.subs.add(this.reportService.getAllReportsForAccount(id)//this.reportService.getAllReports()
    .subscribe((res) => {
      //console.log(res.Items);
      this.dataArray =  res.Items;
      for(let i = 0; i < this.dataArray.length; i++){
        if(this.dataArray[i].report_status === "Missing"){
          this.dataArray[i].report_status = "<b>Missing</b>";
        }
      }

      this.dataSource = new MatTableDataSource<Report_Data>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      /*All the following code until 'parseDateIntoString' pertains to how the app
      handles missing days. Essentially, the front-end will run the addReportService
      equal to the amount of days missed. On weekends, however, it does not count 
      those as missing days. The user will then be able to edit the missing days'
      data*/
      console.log(this.dataArray)
      let continue1 = false;
      (async () => { 
        
        let fake_Current_Date = this.subDays(new Date);
        let current_date = new Date();
        
        let last_Date;
        try {
          last_Date = this.findMaxDateObject(this.dataArray);
        }catch (error) {}

        //spaghetti code       
        if (last_Date != undefined){
          this.globalLastDate = new Date(this.parseDateIntoString(last_Date));

          console.log(this.globalLastDate);
          console.log('fake current date value :\n'+fake_Current_Date);

          let var1 = last_Date.getDate();
          let var2 = last_Date.getFullYear();
          let var3 = last_Date.getMonth();

          let var4 = fake_Current_Date.getDate();
          let var5 = fake_Current_Date.getFullYear();
          let var6 = fake_Current_Date.getMonth();
            
          let var7 = current_date.getDate();
          let var8 = current_date.getFullYear();
          let var9 = current_date.getMonth();

          //serves no purpose other than to allow else if to exist
          if(var1 == var7 && var2 == var8 && var3 == var9){}
          //checks if last date is not equal to fake current date (current date - 1 day)
          else if(var1 != var4 || var2 != var5 || var3 != var6 ){
            //setting counter up for # of iterations
            var count = 0;

            //while 'last date' does not equal current date, keeps adding until it catches up
            //to current date - 1 day
            var checker = last_Date;
              
            try {
              last_Date = this.addDays(last_Date);
              while(last_Date <= fake_Current_Date){
                /*Checks if day is not sunday or saturday then adds report data accordingly*/
                if(last_Date.getDay() != 0 && last_Date.getDay() != 6){
                  console.log('while looping...'+count+'\n'+last_Date);

                  let reportData = {
                    "Item": {
                      "date": this.parseDateIntoString(last_Date),
                      "id": this.makeRandom(),
                      "account_id": 'Bob Test',
                      "report_status": "Missing",
                      "projects": "TBD",
                      "project_text": "Auto-generated"
                    }
                  };
                  /*Below will include a call to reportService in order to add data equalivent to count*/
                  //console.log(reportData);
                  //Do something before delay
                  /*Disables page and then updates report*/
                  this.toggleLayer = true;
                  //await this.delay(1500);
                  this.addreportService.saveReport(reportData, reportData.Item.account_id, reportData.Item.id).subscribe();
                  await this.delay(500);
                  //location.reload();
                  count++;
                }
                last_Date = this.addDays(last_Date);
              }

                continue1 = true;
                this.globalCount = count;
            } catch (error) {}
              /*Pop up prompt here and then on confirmation it reloads page*/
          }
        }
   
          if(this.globalCount != 0 && this.globalCount != undefined){
            var param = {
              'count': this.globalCount,
              'lastdate': this.globalLastDate,
            }
            /*Pop-up for missing days below. Should notify users when the last update
            was, and how many days the user has missed. Will require a refresh after
            the user confirms.*/
            //this.openPopup(param);
            console.log("You have missed " + this.globalCount + " week days");
            location.reload();
          }
      })();
    //alert("Done Please Reload Page");
  },
  (err: HttpErrorResponse) => {console.log(err);}));
}
  /*Misc functions*/

delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

  parseDateIntoString(date:Date){
    var daybuffer: string;
    var monthbuffer: string;
    
    daybuffer = String(date.getDate());
    monthbuffer = String(date.getMonth() + 1);

    if (date.getDate() <= 9){
      daybuffer = '0' + date.getDate();
    }

    if ((date.getMonth() + 1) <= 9){
      monthbuffer = '0' + (date.getMonth() + 1);
    }

    return String(monthbuffer + "/" + daybuffer + "/" + date.getFullYear());
  }

  addDays(date:Date){
    date.setDate(date.getDate() + 1);
    return date;
  }

  subDays(date:Date){
    if(date.getDay()-1 == 0){
      date.setDate(date.getDate()-3);
      console.log(date);
    }else if(date.getDay() != 0 && date.getDay() != 6){
      date.setDate(date.getDate() - 1);
    }
    return date;

  }
  ngAfterViewInit(){
    //console.log('test')
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  //Uses "popup component"
  openPopup(param:object): void{
    const dialogRef = this.matDialog.open(AddReportComponent, {
      height: '50%',
      width: '500px',
      data: param,
      disableClose: true,
    })

  }

  openDialog(optionalParam?: object, optionalParam2?: any): void{
    const dialogRef = this.matDialog.open(AddReportComponent, {
      height: '50%',
      width: '750px',
      data: optionalParam,
      disableClose: true,
    })

  }

  public openPDF(): void {
    const dialogRef = this.matDialog.open(PDF_FormatComponent, {
      height: '50%',
      width: '50%',
    })
    
    /**/
  }

  openDialogBoxFunctionForEdit(row:any){
    this.openDialog(row);
  }

  findMaxDateObject(dateArray:any){
    var max = new Date(dateArray[0].date);
    console.log('initial max date value: \n' + max);
    console.log('iterating '+dateArray.length+' items')
    for(let i = 0; i < dateArray.length; i++){
      if(new Date(dateArray[i].date) > max){
        max = new Date(dateArray[i].date);
        console.log('finding max date..\n'+ max);
      }
      /*for debugging, prints out all the dates the algorithm skips over*/
      /*else{
        console.log('skipping over...... '+new Date(dateArray[i].date))
      }*/
    }
    console.log('max date object found:\n'+max);
    return new Date(max);
  }

  makeRandom() {
    const lengthOfCode = 40;
    let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
}