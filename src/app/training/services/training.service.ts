import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from '../entities/exercise';
import { UIService } from '../../shared/services/ui.service';
import * as UI from '../../shared/ui.actions';
import * as fromTraining from '../training.reducer';
import * as Training from '../training.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _fbSubs: Subscription[] = [];

  constructor(
    private _db: AngularFirestore,
    private _uiService: UIService,
    private _store: Store<fromTraining.State>
  ) { }

  fetchAvailableExercises(): void {
    this._fbSubs.push(
      this._db.collection('availableExercises')
        .snapshotChanges()
        .pipe(map(docArray => {
          return docArray.map(doc => {
            return { id: doc.payload.doc.id, ...doc.payload.doc.data() as Exercise };
          });
        }))
        .subscribe((exercises: Exercise[]) => {
          this._store.dispatch(new UI.StopLoading());
          this._store.dispatch(new Training.SetAvailableTrainings(exercises));
        }, err => {
          this._store.dispatch(new UI.StopLoading());
          this._uiService.showSnackbar('Fetching Exercises failed, plese try again later', null, 4000);
        })
    );
  }

  startExercise(selectedId: string): void {
    this._store.dispatch(new Training.StartTrainig(selectedId));
  }

  completeExercise(): void {
    this._store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: 'completed'
      });
      this._store.dispatch(new Training.StopTrainig());
    });
  }

  cancelExercise(progress: number): void {
    this._store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        duration: exercise.duration * (progress / 100),
        calories: exercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this._store.dispatch(new Training.StopTrainig());
    });
  }

  fetchCompletedOrCancelledExercises(): void {
    this._fbSubs.push(
      this._db.collection('finishedExercises').valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this._store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }

  private addDataToDatabase(exercise: Exercise): void {
    this._db.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions(): void {
    this._fbSubs.map(sub => sub.unsubscribe());
  }
}
