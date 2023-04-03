import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddReportComponent} from '../add-report/add-report.component';
import {MatIconModule} from '@angular/material/icon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Report_Data } from '../data-table/report_data';


@Component({
    selector: 'app-pdf-format',
    templateUrl: './pdf-format.component.html',
    styleUrls: ['./pdf-format.component.css'],
  })
  export class PDF_FormatComponent implements OnInit, OnDestroy {

    displayedColumns: any[] = ['date','projects', 'report_text','report_status']

    public dataSource: MatTableDataSource<Report_Data>;

    @Inject(MAT_DIALOG_DATA) public data: {egg:Array<Report_Data>}
    
    ngOnInit(): void {
        console.log(this.data);
        if(this.data != undefined){
            console.log(this.data.egg);
            this.dataSource = new MatTableDataSource<Report_Data>();
        }
    }
    
    ngOnDestroy(): void {
      
    }
}