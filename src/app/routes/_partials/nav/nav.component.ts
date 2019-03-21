import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './../../../services/auth.service';
import { SnackbarService } from './../../../services/snackbar.service';
<<<<<<< HEAD
=======
import { User } from 'src/app/models/user';
>>>>>>> dev

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  title = `ST. ILLIAN's Pharmacy`;
  sideMenu = [
    { path: '/', title: 'Home', icon: 'home' },
    { path: '/profile', title: 'Profile', icon: 'account_circle' },
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard' },
    { path: '/reports', title: 'Reports', icon: 'assignment' },
    { path: '/transactions', title: 'Transactions', icon: 'list' },
    { path: '/inventory', title: 'Inventory', icon: 'store' }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private snackBar: SnackbarService
  ) {}

  logout() {
    return this.auth.signOut();
  }
<<<<<<< HEAD
=======

  checkRole(user: User) {
    return this.auth.canDelete(user)
      ? 'Admin'
      : this.auth.canEdit
      ? 'Editor'
      : 'Subscriber';
  }
>>>>>>> dev
}
