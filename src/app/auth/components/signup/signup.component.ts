import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/auth.service';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  maxDate: any;
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

  ngOnDestroy(): void {
    if (this._loadingSubs) {
      this._loadingSubs.unsubscribe();
    }
  }

}
