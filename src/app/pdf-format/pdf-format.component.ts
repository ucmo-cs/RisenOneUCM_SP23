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
      let id = "Null";

      if(localStorage.getItem("account_id") != null){
        id = localStorage.getItem("account_id")!;
        
      }

        this.sub.add(this.reportService.getAllReportsForAccount(id)
      .subscribe((res) => {
        this.dataArray =  res.Items;
        

    
      this.dataSource = new MatTableDataSource<Report_Data>(this.dataArray);
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

            html2canvas(document.getElementById('dataTable2')!, {scale: 3}).then(function(canvas){
                var wid = canvas.width;
                var hgt = canvas.height;
                var img = canvas.toDataURL("image/png", 1.0);
                var hratio = hgt / wid;
                var doc = new jsPDF('p','pt','a4');
                var width = doc.internal.pageSize.width;    
                var height = doc.internal.pageSize.height;//width * hratio
                doc.addImage(img,'JPEG',0,0, width, height);
                doc.save('Test.pdf');
            });


            /*var quotes = document.getElementById('dataTable2')!;
        html2canvas(quotes).then((canvas) => {
        //! MAKE YOUR PDF
        var pdf = new jsPDF('p', 'pt', 'letter');

        for (var i = 0; i <= quotes.clientHeight/980; i++) {
            //! This is all just html2canvas stuff
            var srcImg  = canvas;
            var sX      = 0;
            var sY      = 980*i; // start 980 pixels down for every new page
            var sWidth  = 900;
            var sHeight = 980;
            var dX      = 0;
            var dY      = 0;
            var dWidth  = 900;
            var dHeight = 980;

            window.onePageCanvas = document.createElement("canvas");
            onePageCanvas.setAttribute('width', 900);
            onePageCanvas.setAttribute('height', 980);
            var ctx = onePageCanvas.getContext('2d');
            ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

            // document.body.appendChild(canvas);
            var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

            var width         = onePageCanvas.width;
            var height        = onePageCanvas.clientHeight;

            //! If we're on anything other than the first page,
            // add another page
            if (i > 0) {
                pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
            }
            //! now we declare that we're working on that page
            pdf.setPage(i+1);
            //! now we add content to that page!
            pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));

        }
        //! after the for loop is finished running, we save the pdf.
        pdf.save('Test.pdf');
  });*/
            
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
          }
    }

    executeClose(){
      window.close();
    }
}