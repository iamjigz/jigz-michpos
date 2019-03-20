import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && user.roles.admin ? true : false)), // <-- important line
      tap(isAdmin => {
        if (!isAdmin) {
          this.snackBar.open(
            'Access denied. Must have permission to view content.',
            'OK',
            {
              duration: 5000
            }
          );
          this.route.navigate(['login']);
        }
      })
    );
  }
}
