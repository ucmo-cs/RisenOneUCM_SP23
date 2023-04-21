import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  toggleLayer = false;
  
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm:NgForm ){
          //console.log(loginForm.value);
          //console.log(loginForm.value.userName);
          
          localStorage.setItem("account_id", loginForm.value.userName);

          this._router.navigate(["data-table-component"]);
  }


  
}
