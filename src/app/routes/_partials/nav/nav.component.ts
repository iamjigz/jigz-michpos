import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './../../../services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  title = `ST. ILIAN's Pharmacy`;
  sideMenu = [
    { path: '/', title: 'Home', icon: 'home' },
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
    public auth: AuthService
  ) {}

  logout() {
    return this.auth.signOut();
  }

  checkRole(user: User) {
    return this.auth.canDelete(user)
      ? 'Admin'
      : this.auth.canEdit
      ? 'Editor'
      : 'Subscriber';
  }
}
