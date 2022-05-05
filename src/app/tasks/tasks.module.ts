import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoardModalComponent } from './components/new-board-modal/new-board-modal.component';
import { SharedModule } from '@shared/shared.module';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { NewListModalComponent } from './components/new-list-modal/new-list-modal.component';

@NgModule({
  declarations: [NewBoardModalComponent, NewTaskModalComponent, EditTaskModalComponent, NewListModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({}),
  ],
  exports: [NewBoardModalComponent, NewTaskModalComponent, EditTaskModalComponent, NewListModalComponent],
})
export class TasksModule {}
