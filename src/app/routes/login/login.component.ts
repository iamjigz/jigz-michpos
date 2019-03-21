import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackbarService } from '../../services/snackbar.service';
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
    private snackBar: SnackbarService
  ) {}

  ngAfterViewInit() {
    (window as any).initialize();

    this.loginGroup = this.fb.group({
      email: [this.email, Validators.required],
      password: [this.password, Validators.required]
    });
  }

  login() {
    this.auth
      .login(this.email, this.password)
      .then(res => {
        this.snackBar.show(`You've successfuly logged in.`, 'OK');
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.snackBar.show(err.message, 'OK');
      });
  }

  googleLogin() {
    this.auth
      .googleLogin()
      .then(res => {
        this.snackBar.show(`You've successfuly logged in.`, 'OK');
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.snackBar.show(err.message, 'OK');
      });
  }
}
