import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { AuthData } from '../entities/auth-data';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(
    private _router: Router
  ) { }

  registerUser(authData: AuthData): void {
    this.user = {
      userId: Math.round(Math.random() * 100000).toString(),
      email: authData.email
    };
    this.authSuccefully();
  }

  login(authData: AuthData): void {
    this.user = {
      userId: Math.round(Math.random() * 100000).toString(),
      email: authData.email
    };
    this.authSuccefully();
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this._router.navigate(['/login']);
  }

  getUser(): User {
    return { ... this.user };
  }

  isAuth(): boolean {
    return !!this.user;
  }

  private authSuccefully(): void {
    this.authChange.next(true);
    this._router.navigate(['/training']);
  }
}
