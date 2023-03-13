import { Element } from '@angular/compiler';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { elementAt } from 'rxjs';
import { AddReportService } from './add-report.service';
import { Report_Data } from '/workspaces/RisenOneUCM_SP23/src/app/data-table/report_data';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

export interface AddReportData{
  name:string,
  date:string,
  report:string,
}

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent {

  name:string;
  date:string;
  report:string;

  constructor(private addreportService: AddReportService, public dialog: MatDialog) { }

  reportData = {
    "TableName": "Report",
    "Item": {
      "date": "",
      "id": "",
      "account_id": "",
      "report_status": "",
      "projects": "",
      "project_text": ""
    }
  };

  
  makeRandom() {
    const lengthOfCode = 40;
    let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
  
  

  populateData(){
    try{
      let dateBuffer = String(new Date().toLocaleString().split(",")[0]);
      this.reportData.Item.date = dateBuffer;
      this.reportData.Item.projects = "TBD";
      
      this.reportData.Item.project_text = String(document.getElementById("report_text")?.innerHTML);
      this.reportData.Item.account_id = "0";
      this.reportData.Item.report_status = "Submitted";
      this.reportData.Item.id =  this.makeRandom();
    }
    catch(exception){
      console.log(exception)
      return exception;
    }
  }

  onSave(){
    try{
      this.populateData();
    }
    catch(exception){
      return exception;
    }

    try{
      this.addreportService.saveReport(this.reportData);
      console.log(this.reportData);
      //self.window.close();
    }
    catch(exception){
      return exception;
    }
  }

  closeWindow(){
    window.self.close();
  }
}
@Component({
  selector: 'add-report-popup',
  templateUrl: './add-report-popup.html',
})
export class AddReportPopup {
  constructor(
    public dialogRef: MatDialogRef<AddReportPopup>,
    @Inject(MAT_DIALOG_DATA) public data: AddReportData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}