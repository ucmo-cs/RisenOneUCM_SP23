import { Element } from '@angular/compiler';
import { Component, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { elementAt } from 'rxjs';
import { AddReportService } from './add-report.service';
import { Report_Data } from '/workspaces/RisenOneUCM_SP23/src/app/data-table/report_data';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { DataTableComponent } from '../data-table/data-table.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  @ViewChild (DataTableComponent) refresh: DataTableComponent;

  /*
  For .html disable toggle
  */
  toggleLayer = false;

  report:string;
  employeeNameControl = new FormControl('');
  dateControl = new FormControl({value: new Date(), disabled: true});
  reportTextControl = new FormControl('');

  
  constructor(
    public dialogRef: MatDialogRef<AddReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {account_id: string,date:string,
      id: string, project_text: string, projects: string, report_status: string},
      private addreportService: AddReportService,public dialog: MatDialog) {}
  
  /*
  this only serves to pull up data on click
  */
  ngOnInit(): void {
    //this handles pulling up data
    if(this.data != undefined){
      this.reportTextControl.reset(this.data.project_text);
      this.dateControl.setValue((new Date(this.data.date)));
      this.employeeNameControl.reset(this.data.account_id);
    }

    //if data.date is not null

  }
  
    
  reportData : Report_Data = {
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
    this.events.push(type+":"+ event.value);
    console.log(this.events);
    console.log();
  }
  addDays(date:string,days:number){
    var result= new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  toFormattedDate(iso: string) {
    const date = new Date(iso);
    console.log(date.getDate()+1);
    console.log(new Date(Date.parse('3/32/2022')));

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
  

  /*
  Essentially populateSaveData and populateUpdateData uses the predefined object 'reportData'
  to load the object into a defined object before saving/updating. Ensures uniformity.
  */
  populateSaveData(){
    /*
    Account ID will ideally take data from user login information. For now
    it is just a hard coded value. Projects will also take from 'projects'
    field from accounts. For now it is a hardcoded value.
    */
    try{
      this.reportData.Item.date = this.parseDateIntoString(this.dateControl.value!);
      this.reportData.Item.projects = "TBD";
      this.reportData.Item.project_text = this.reportTextControl.value!;
      this.reportData.Item.account_id = "Bob Test"; 
      this.reportData.Item.report_status = "Submitted";
      this.reportData.Item.id =  this.makeRandom();
      console.log((document.getElementById("report_text") as HTMLInputElement).value);
    }
    catch(exception){
      return exception;
    }
  }

  populateUpdateData(){
    try{
      this.reportData.Item.date = this.data.date;//dateBuffer;
      this.reportData.Item.projects = this.data.projects;
      this.reportData.Item.project_text = this.reportTextControl.value!;
      this.reportData.Item.account_id = this.data.account_id;
      this.reportData.Item.report_status = "Submitted";
      this.reportData.Item.id =  this.data.id;
    }
    catch(exception){
      return exception;
    }
  }



  /*
  This functions handles either post or patch. A lot of try-catch
  statements in order to try and prevent any errors that would be
  application-breaking.
  */
  onSave(){
    //handles post
    if(this.data == undefined){
      try{
        this.populateSaveData();
      }
      catch(exception){
        return exception;
      }

      try{
        (async () => { 
          // Do something before delay

          /*
          Disables page and then saves report
          */
          this.toggleLayer = true;
          this.addreportService.saveReport(this.reportData).subscribe();
  
          await this.delay(3000);
  
          // Do something after
          this.dialogRef.close();
          location.reload();
        })();
        
      }
      catch(exception){
        return exception;
      }

    }

    /*
    handles patch
    */

    else{
      try {
        this.populateUpdateData();
      } catch (error) {
        return error;
      }

      try{
        (async () => { 
          // Do something before delay

          /*
          Disables page and then updates report
          */
          this.toggleLayer = true;
          this.addreportService.updateReport(this.reportData).subscribe();
  
          await this.delay(3000);
  
          // Do something after
          this.dialogRef.close();
          location.reload();
        })(); 
      }
      catch(exception){
        return exception;
      }
    }
  }

  /*
  Misc Functions
  */
  parseDateIntoString(date:Date){
    var daybuffer: string;
    var monthbuffer: string;
    
    daybuffer = String(date.getDate());
    monthbuffer = String(date.getMonth() + 1);

    if (date.getDate() <= 9){
      daybuffer = '0' + date.getDate();
    }

    if ((date.getMonth() + 1) <= 9){
      monthbuffer = '0' + (date.getMonth() + 1);
    }

    return String(monthbuffer + "/" + daybuffer + "/" + date.getFullYear());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}