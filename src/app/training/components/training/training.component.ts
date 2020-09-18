import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromTraining from '../../training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(
    private _store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this._store.select(fromTraining.getIsTraining);
  }
}
