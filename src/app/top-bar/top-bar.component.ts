import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  testFunction(){
    console.log('test success');
  }

}
