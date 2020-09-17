import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(
    private _trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.exerciseSubscription = this._trainingService.exerciseChanged
      .subscribe(exercise => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

}
