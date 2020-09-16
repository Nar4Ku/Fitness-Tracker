import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AuthData } from '../entities/auth-data';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor() { }

  registerUser(authData: AuthData): void {
    this.user = {
      userId: Math.round(Math.random() * 100000).toString(),
      email: authData.email
    };
    this.authChange.next(true);
  }

  login(authData: AuthData): void {
    this.user = {
      userId: Math.round(Math.random() * 100000).toString(),
      email: authData.email
    };
    this.authChange.next(true);
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
  }

  getUser(): User {
    return { ... this.user };
  }

  isAuth(): boolean {
    return this.user !== null;
  }
}
