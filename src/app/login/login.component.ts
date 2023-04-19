import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  toggleLayer = false;
    constructor()
       {
  }
  ngOnInit(): void {
    
  }

  onLogin(loginForm:NgForm ){
          console.log(loginForm.value)
  }


  
}
