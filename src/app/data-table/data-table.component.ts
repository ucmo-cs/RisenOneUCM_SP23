import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataTableService } from './data-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Report_Data } from './report_data';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  displayedColumns: any[] = ['var1','var2','var3',];

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
        //console.log(this.dataArray.Items[0].report_status);
        for(let i = 0; i < this.dataArray.Items.length; i++){
            if(this.dataArray.Items[i].report_status === "Missing"){
              this.dataArray.Items[i].report_status = "<b>Missing</b>";
            }
        }
        this.dataSource = new MatTableDataSource<Report_Data>(this.dataArray.Items);
        //console.log(this.dataSource.data);
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