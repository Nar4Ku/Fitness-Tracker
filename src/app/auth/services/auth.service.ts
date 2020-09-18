import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { AuthData } from '../entities/auth-data';
import { TrainingService } from '../../training/services/training.service';
import { UIService } from '../../shared/services/ui.service';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Auth from '../auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _router: Router,
    private _authFireAuth: AngularFireAuth,
    private _trainingService: TrainingService,
    private _uiService: UIService,
    private _store: Store<fromRoot.State>
  ) { }

  initAuthListener(): void {
    this._authFireAuth.authState.subscribe(user => {
      if (user) {
        this._store.dispatch(new Auth.SetAuthenticated());
        this._router.navigate(['/training']);
      } else {
        this._trainingService.cancelSubscriptions();
        this._store.dispatch(new Auth.SetUnauthenticated());
        this._router.navigate(['/login']);
      }
    });
  }

  async registerUser(authData: AuthData): Promise<any> {
    this._store.dispatch(new UI.StartLoading());
    await this._authFireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._store.dispatch(new UI.StopLoading()))
      .catch(err => {
        this._store.dispatch(new UI.StopLoading());
        this._uiService.showSnackbar(err.message, null, 4000);
      });
  }

  async login(authData: AuthData): Promise<any> {
    this._store.dispatch(new UI.StartLoading());
    await this._authFireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._store.dispatch(new UI.StopLoading()))
      .catch(err => {
        this._store.dispatch(new UI.StopLoading());
        this._uiService.showSnackbar(err.message, null, 4000);
      });
  }

  logout(): void {
    this._authFireAuth.signOut();
  }
}
