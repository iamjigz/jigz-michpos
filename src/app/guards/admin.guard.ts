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
export class AdminGuard implements CanActivate {
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
      map(user => (user && this.auth.canRead(user) ? true : false)), // <-- important line
      tap(canView => {
        if (!canView) {
          this.snackBar.open('Access denied - Admins only.', 'OK', {
            duration: 5000
          });
        }
      })
    );
  }
}
