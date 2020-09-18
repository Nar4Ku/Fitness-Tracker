import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from '../entities/auth-data';
import { TrainingService } from '../../training/services/training.service';
import { UIService } from '../../shared/services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private _router: Router,
    private _authFireAuth: AngularFireAuth,
    private _trainingService: TrainingService,
    private _uiService: UIService
  ) { }

  initAuthListener(): void {
    this._authFireAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this._router.navigate(['/training']);
      } else {
        this._trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this._router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  async registerUser(authData: AuthData): Promise<any> {
    this._uiService.loadingStateChanged.next(true);
    await this._authFireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._uiService.loadingStateChanged.next(false))
      .catch(err => {
        this._uiService.loadingStateChanged.next(false);
        this._uiService.showSnackbar(err.message, null, 4000);
      });
  }

  async login(authData: AuthData): Promise<any> {
    this._uiService.loadingStateChanged.next(true);
    await this._authFireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._uiService.loadingStateChanged.next(false))
      .catch(err => {
        this._uiService.loadingStateChanged.next(false);
        this._uiService.showSnackbar(err.message, null, 4000);
      });
  }

  logout(): void {
    this._authFireAuth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

}
