import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../entities/exercise';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  newTrainingForm: FormGroup;
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = false;
  private _loadingSubs: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _trainingService: TrainingService,
    private _uiService: UIService
  ) { }

  ngOnInit(): void {
    this._loadingSubs = this._uiService.loadingStateChanged
      .subscribe(isLoading => this.isLoading = isLoading);

    this.newTrainingForm = this._formBuilder.group({ exercise: ['', Validators.required] });

    this.exerciseSubscription = this._trainingService.exercisesChanged
      .subscribe(exercises => this.exercises = exercises);

    this.fecthExercises();
  }

  onStartingTraining(): void {
    this._trainingService.startExercise(this.newTrainingForm.value.exercise);
  }

  fecthExercises(): void {
    this._trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this._loadingSubs) {
      this._loadingSubs.unsubscribe();
    }
  }
}
