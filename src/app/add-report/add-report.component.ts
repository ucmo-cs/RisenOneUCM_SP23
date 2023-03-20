import { Element } from '@angular/compiler';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { elementAt } from 'rxjs';
import { AddReportService } from './add-report.service';
import { Report_Data } from '/workspaces/RisenOneUCM_SP23/src/app/data-table/report_data';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { DataTableComponent } from '../data-table/data-table.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
export class AddReportComponent implements OnInit {

  report:string;
  employeeNameControl = new FormControl('');
  dateControl = new FormControl('');
  reportTextControl = new FormControl('');

  
  constructor(
    public dialogRef: MatDialogRef<AddReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {account_id: string,date:string,
      id: string, project_text: string, projects: string, report_status: string},
      private addreportService: AddReportService,public dialog: MatDialog) {}
  
  ngOnInit(): void {
    if(this.data != undefined){
      console.log(this.data);
      document.getElementById("report_text")!.innerText = this.data.project_text;
    }
  }
    
  reportData = {
    "Item": {
      "date": "",
      "id": "",
      "account_id": "",
      "report_status": "",
      "projects": "",
      "project_text": ""
    }
  };
  events: string[]=[];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>){
    this.events.push('${type}: ${event.value}');
    console.log(this.events)
  }
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
    if(this.data == undefined){
      try{
        this.populateData();
      }
      catch(exception){
        return exception;
      }

      try{
        this.addreportService.saveReport(this.reportData);
        //console.log(this.reportData);
        this.dialogRef.close();
      }
      catch(exception){
        return exception;
      }

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

//}
}