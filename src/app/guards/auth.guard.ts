import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private route: Router,
    private snackBar: SnackbarService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && this.auth.canRead(user) ? true : false)),
      tap(canView => {
        if (!canView) {
          this.snackBar.show('You have to log in to continue.', 'OK');
          this.route.navigate(['login']);
        }
      })
    );
  }
}
