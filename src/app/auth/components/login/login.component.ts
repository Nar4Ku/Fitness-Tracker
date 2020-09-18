import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agree: [true, Validators.requiredTrue]
    });
  }

  get f(): any { return this.loginForm; }

  onSubmit(): void {
    this._authService.login({
      email: this.f.value.email,
      password: this.f.value.password
    });
  }
}
