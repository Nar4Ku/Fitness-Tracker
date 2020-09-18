import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../entities/exercise';
import * as fromRoot from '../../../app.reducer';
import * as fromTraining from '../../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private _trainingService: TrainingService,
    private _store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.newTrainingForm = this._formBuilder.group({ exercise: ['', Validators.required] });
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.exercises$ = this._store.select(fromTraining.getAvailableTrainings);
    this.fecthExercises();
  }

  onStartingTraining(): void {
    this._trainingService.startExercise(this.newTrainingForm.value.exercise);
  }

  fecthExercises(): void {
    this._trainingService.fetchAvailableExercises();
  }
}
