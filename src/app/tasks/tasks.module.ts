import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoardModalComponent } from './components/new-board-modal/new-board-modal.component';
import { SharedModule } from '@shared/shared.module';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewBoardModalComponent, NewTaskModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [NewBoardModalComponent, NewTaskModalComponent],
})
export class TasksModule {}
