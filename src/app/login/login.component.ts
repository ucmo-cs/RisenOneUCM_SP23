import { Component } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private router: Router,
      private socialAuthService: SocialAuthService) {
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  callbackFunction(){
    console.log("TEST");
  }

  login() {
    if (!this.loginForm.valid)
    return;
  }
}
