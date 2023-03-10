import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataTableService } from './data-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Report_Data } from './report_data';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {AddReportComponent, AddReportPopup} from '../add-report/add-report.component'
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  displayedColumns: any[] = ['date','projects','report_status',];

  public dataSource: MatTableDataSource<Report_Data>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(private reportService: DataTableService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.subs.add(this.reportService.getAllReports()
      .subscribe((res) => {
        //console.log(res);
        this.dataArray =  JSON.parse(res.body);
        //console.log(this.dataArray.Items[0].report_status);
        for(let i = 0; i < this.dataArray.Items.length; i++){
            if(this.dataArray.Items[i].report_status === "Missing"){
              this.dataArray.Items[i].report_status = "<b>Missing</b>";
            }
        }
        this.dataSource = new MatTableDataSource<Report_Data>(this.dataArray.Items);
      
        this.dataSource.paginator = this.paginator;
        //console.log(this.dataSource.data);
        //console.log(this.dataSource)
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        }));
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
  openDialog(): void{
    const dialogRef = this.matDialog.open(AddReportPopup, {
      
    })
  }

  
}