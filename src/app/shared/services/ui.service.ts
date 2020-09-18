import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(
    private _snackbar: MatSnackBar
  ) { }

  showSnackbar(message, action, durationTime): void {
    this._snackbar.open(message, action, {
      duration: durationTime
    });
  }
}
