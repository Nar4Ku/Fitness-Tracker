import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Exercise } from '../entities/exercise';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private _availableExercises: Exercise[] = [];
  private _runningExercise: Exercise;
  private _fbSubs: Subscription[];

  constructor(
    private _db: AngularFirestore
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
          this._availableExercises = exercises;
          this.exercisesChanged.next([...this._availableExercises]);
        })
    );
  }

  getRunningExercise(): any {
    return { ... this._runningExercise };
  }

  startExercise(selectedId: string): void {
    this._runningExercise = this._availableExercises.find(exercise => exercise.id === selectedId);
    this.exerciseChanged.next({ ...this._runningExercise });
  }

  completeExercise(): void {
    this.addDataToDatabase({
      ...this._runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number): void {
    this.addDataToDatabase({
      ...this._runningExercise,
      duration: this._runningExercise.duration * (progress / 100),
      calories: this._runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises(): void {
    this._fbSubs.push(
      this._db.collection('finishedExercises').valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  private addDataToDatabase(exercise: Exercise): void {
    this._db.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions(): void {
    this._fbSubs.forEach(sub => sub.unsubscribe());
  }
}
