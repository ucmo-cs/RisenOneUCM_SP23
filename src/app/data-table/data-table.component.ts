import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataTableService } from './data-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Report_Data } from './report_data';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {AddReportComponent} from '../add-report/add-report.component'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    const dialogRef = this.matDialog.open(AddReportComponent, {
      height: '40%',
      width: '60%'
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
}