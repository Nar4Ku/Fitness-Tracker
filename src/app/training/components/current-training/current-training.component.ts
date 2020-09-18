import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../../services/training.service';
import * as fromTraining from '../../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  timer: any;
  progress = 0;

  constructor(
    private _dialog: MatDialog,
    private _trainingService: TrainingService,
    private _store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    this._store.select(fromTraining.getActiveTraining)
      .subscribe(exercise => {
        const step = exercise.duration / 100 * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;

          if (this.progress >= 100) {
            this._trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this._dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
