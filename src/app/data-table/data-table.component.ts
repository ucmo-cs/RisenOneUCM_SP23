import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableService } from './data-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { Reports } from './Report';
import { MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export interface Test {
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

  public dataSource: MatTableDataSource<Test>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(private financeService: DataTableService) { }

  ngOnInit() {
    this.subs.add(this.financeService.getRandomUsers()
      .subscribe((res) => {
        //console.log(res);
        this.dataArray =  JSON.parse(res.body);
        //console.log(this.dataArray.Items);
        this.dataSource = new MatTableDataSource<Test>(this.dataArray.Items);
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