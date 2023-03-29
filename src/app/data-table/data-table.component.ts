import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private reportService: DataTableService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.subs.add(this.reportService.getAllReports()
      .subscribe((res) => {
        this.dataArray =  JSON.parse(res.body);
        for(let i = 0; i < this.dataArray.Items.length; i++){
            if(this.dataArray.Items[i].report_status === "Missing"){
              this.dataArray.Items[i].report_status = "<b>Missing</b>";
            }
        }

        console.log(res);
        this.dataSource = new MatTableDataSource<Report_Data>(this.dataArray.Items);
      
        this.dataSource.paginator = this.paginator;
        //console.log(this.dataSource.data);
        //console.log(this.dataSource)
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

       

        let fake_Current_Date = this.subDays(new Date);
        let current_date = new Date();
        let last_Date = this.findMaxDateObject(this.dataArray.Items);

        //spaghetti code 
        if (last_Date != undefined){
          this.globalLastDate = new Date(this.parseDateIntoString(last_Date));

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
            while(last_Date.getDate() != fake_Current_Date.getDate()){

              last_Date = this.addDays(last_Date);

              if(last_Date.getDay() != 0 && last_Date.getDay() != 6){
                let reportData = {
                  "Item": {
                    "date": this.parseDateIntoString(last_Date),
                    "id": "",
                    "account_id": '0',
                    "report_status": "Missing",
                    "projects": "",
                    "project_text": "Auto-generated"
                  }
                };
                count++;
              }
              //this.openDialog();
              //console.log("TESTTTTTT");
              //console.log(last_Date);
              
            }
            this.globalCount = count;
          }
        }

        if(this.globalCount != 0 && this.globalCount != undefined){
          var param = {
            'count': this.globalCount,
            'lastdate': this.globalLastDate,
          }
          //this.openPopup(param);
        }
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        }));
      
  }

  parseDateIntoString(date:Date){
    return String((date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear());
  }

  addDays(date:Date){
    date.setDate(date.getDate() + 1);
    return date;
  }

  subDays(date:Date){
    date.setDate(date.getDate() - 1);
    return date;
  }
  ngAfterViewInit(){
    console.log('test')
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
    let DATA: any = document.getElementById('dataTable');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  openDialogBoxFunctionForEdit(row:any){
    this.openDialog();
  }

  findMaxDateObject(dateArray:any){
    var max = new Date(dateArray[0].date);
    for(let i = 0; i < dateArray.length; i++){
      if(new Date(dateArray[i].date) > max){
        max = dateArray[i].date;
      }
    }
    return new Date(max);
  }

  /*
  @ViewChild(DataTableComponent) table: MatTable<any>
  refreshTable(): void{
    this.service.method().subscribe(resources => {
      this.dataSource.data = resources; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.table.renderRows();
  }
  */
 
}