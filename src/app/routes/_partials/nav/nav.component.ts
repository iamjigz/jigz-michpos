import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  title = 'MichPOS';
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

  constructor(private breakpointObserver: BreakpointObserver) {}
}
