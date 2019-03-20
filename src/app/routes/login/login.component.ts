import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import '../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  public loginGroup: FormGroup;
  public email: string;
  public password: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngAfterViewInit() {
    (window as any).initialize();

    this.loginGroup = this.fb.group({
      email: [this.email, Validators.required],
      password: [this.password, Validators.required]
    });
  }

  login() {
    // console.log(`email: ${this.email} password: ${this.password}`);
    // alert(`Email: ${this.email} Password: ${this.password}`);
    this.auth
      .login(this.email, this.password)
      .then(res => {
        console.log('You\'ve logged in', res);
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err));
  }
}
