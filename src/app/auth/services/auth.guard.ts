import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canLoad(route: Route): boolean {
    if (this._authService.isAuth()) {
      return true;
    } else {
      this._router.navigate(['/login']);
    }
  }

}
