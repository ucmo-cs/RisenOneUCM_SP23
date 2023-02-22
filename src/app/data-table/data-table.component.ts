import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataTableService } from './data-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';

export interface Report_Data {
  id: number,
  report_data: string,
  account_id: number
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  displayedColumns: any[] = ['var1','var2',];

  public dataSource: MatTableDataSource<Report_Data>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(private reportService: DataTableService) { }

  ngOnInit() {
    this.subs.add(this.reportService.getAllReports()
      .subscribe((res) => {
        //console.log(res);
        this.dataArray =  JSON.parse(res.body);
        //console.log(this.dataArray.Items);
        this.dataSource = new MatTableDataSource<Report_Data>(this.dataArray.Items);
        console.log(this.dataSource.data);
        //console.log(this.dataSource)
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        }));
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
  
}