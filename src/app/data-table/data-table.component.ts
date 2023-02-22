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

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  displayedColumns: string[] = ['body','statusCode',];

  public dataSource: MatTableDataSource<Reports>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(private financeService: DataTableService) { }

  ngOnInit() {
    this.subs.add(this.financeService.getRandomUsers()
      .subscribe((res) => {
        console.log(res);
        this.dataArray =  res;

        this.dataSource = new MatTableDataSource<Reports>(this.dataArray);
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