import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
    private router: Router,
    private snackBar: MatSnackBar
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
        this.snackBar.open(`You've successfuly logged in.`, 'OK', {
          duration: 5000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.snackBar.open(err.message, 'OK', {
          duration: 5000
        });
      });
  }
}
