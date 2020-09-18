import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthRoutingModule } from './auth.routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
    AngularFireAuthModule,
  ]
})
export class AuthModule { }
