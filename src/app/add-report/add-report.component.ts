import { Component, OnInit, ElementRef } from '@angular/core';
import { AddReportService } from './add-report.service';
import { Report_Data } from '/workspaces/RisenOneUCM_SP23/src/app/data-table/report_data';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent {
  constructor(private addreportService: AddReportService) { }


  reportData:Report_Data;


  populateData(){
    //this.reportData.projects()
    document.getElementById("report_text")?.innerHTML;
    
  }

  onSave(){
    this.populateData();
    //if()
    try{
      this.addreportService.saveReport(this.reportData);
    }
    catch(exception){
      return exception;
    }
  }

  closeWindow(){
    window.self.close();
  }
}
