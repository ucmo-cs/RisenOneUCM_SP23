import { Component, OnInit, ViewChild, OnDestroy, Inject, AfterContentInit } from '@angular/core';
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
import { DataTableService } from '../data-table/data-table.service';
import { async } from '@angular/core/testing';


@Component({
    selector: 'app-pdf-format',
    templateUrl: './pdf-format.component.html',
    styleUrls: ['./pdf-format.component.css'],
  })
  export class PDF_FormatComponent implements OnInit, OnDestroy {

    constructor(private reportService: DataTableService) { }

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    private sub = new Subscription();

    private dataArray: any;

    displayedColumns: any[] = ['date','projects', 'report_text','report_status']

    public dataSource: MatTableDataSource<Report_Data>;

    ngOnInit(): void {
        this.sub.add(this.reportService.getAllReports()
      .subscribe((res) => {
        this.dataArray =  JSON.parse(res.body);
        

    
      this.dataSource = new MatTableDataSource<Report_Data>(this.dataArray.Items);
      this.dataSource.sort = this.sort;
      

    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
    }

    executePDF(){
        /*let DATA: any = document.getElementById('dataTable2');
            html2canvas(DATA).then((canvas) => {
            let fileWidth = canvas.width;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let PDF = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            PDF.save('angular-demo.pdf');
            });*/

            html2canvas(document.getElementById('dataTable2')!, {scale: 2}).then(function(canvas){
                var wid: number
                var hgt: number
                var img = canvas.toDataURL("image/png", wid = canvas.width); //hgt = canvas.height);
                var hratio = canvas.height/wid;
                var doc = new jsPDF('p','pt','a4');
                var width = doc.internal.pageSize.width;    
                var height = width * hratio
                doc.addImage(img,'JPEG',0,0, width, height);
                doc.save('Test.pdf');
            });
            
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
          }
    }
}