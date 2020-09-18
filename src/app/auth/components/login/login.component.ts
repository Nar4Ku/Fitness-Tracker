import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/auth.service';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private _loadingSubs: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _uiService: UIService
  ) { }

  ngOnInit(): void {
    this._loadingSubs = this._uiService.loadingStateChanged
      .subscribe(isLoading => this.isLoading = isLoading);

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

  ngOnDestroy(): void {
    if (this._loadingSubs) {
      this._loadingSubs.unsubscribe();
    }
  }

}
