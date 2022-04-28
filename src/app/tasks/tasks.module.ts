import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoardModalComponent } from './components/new-board-modal/new-board-modal.component';
import { SharedModule } from '@shared/shared.module';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';



@NgModule({
  declarations: [
    NewBoardModalComponent,
    NewTaskModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NewBoardModalComponent
  ]
})
export class TasksModule { }
