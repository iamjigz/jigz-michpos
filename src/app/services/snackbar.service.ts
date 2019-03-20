import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(public snackBar: MatSnackBar) {}

  public show(message: string, action: string) {
    return this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
