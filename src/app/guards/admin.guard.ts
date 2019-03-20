import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private snackBar: SnackbarService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && user.roles.admin ? true : false)),
      tap(isAdmin => {
        if (!isAdmin) {
          this.snackBar.show(
            'You do not have enough permissions to access this.',
            'OK'
          );
        }
      })
    );
  }
}
