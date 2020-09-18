import { NgModule } from '@angular/core';

import { TrainingRoutingModule } from './training.routing.module';
import { SharedModule } from '../shared/shared.module';
import { TrainingComponent } from './components/training/training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { StopTrainingComponent } from './components/current-training/stop-training.component';

const modules = [
  TrainingComponent,
  NewTrainingComponent,
  CurrentTrainingComponent,
  PastTrainingComponent,
  StopTrainingComponent
];

@NgModule({
  declarations: [...modules],
  imports: [
    TrainingRoutingModule,
    SharedModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
