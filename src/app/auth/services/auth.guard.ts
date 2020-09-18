import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }

  canLoad(route: Route): Observable<boolean> {
    return this._store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }

}
