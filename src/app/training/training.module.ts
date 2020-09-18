import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { TrainingRoutingModule } from './training.routing.module';
import { SharedModule } from '../shared/shared.module';
import { TrainingComponent } from './components/training/training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { StopTrainingComponent } from './components/current-training/stop-training.component';
import { trainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    TrainingRoutingModule,
    SharedModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
