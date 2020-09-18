import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  maxDate: any;
  isLoading$: Observable<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);

    this.signupForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      birthdate: ['', Validators.required],
      agree: [true, Validators.requiredTrue]
    });

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  get f(): any { return this.signupForm; }

  onSubmit(): void {
    this._authService.registerUser({
      email: this.f.value.email,
      password: this.f.value.password
    });
  }
}
