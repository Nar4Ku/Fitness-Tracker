import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../entities/exercise';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  newTrainingForm: FormGroup;
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.newTrainingForm = this._formBuilder.group({ exercise: ['', Validators.required] });
    this.exerciseSubscription = this._trainingService.exercisesChanged
      .subscribe(exercises => this.exercises = exercises);
    this._trainingService.fetchAvailableExercises();
  }

  onStartingTraining(): void {
    this._trainingService.startExercise(this.newTrainingForm.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
