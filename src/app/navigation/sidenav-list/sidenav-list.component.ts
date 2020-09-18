import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/services/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private _authService: AuthService,
    private _store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this._store.select(fromRoot.getIsAuthenticated);
  }

  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.onClose();
    this._authService.logout();
  }
}
