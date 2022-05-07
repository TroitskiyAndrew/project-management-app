import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoardModalComponent } from './components/new-board-modal/new-board-modal.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NewBoardModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({}),
  ],
  exports: [NewBoardModalComponent],
})
export class TasksModule { }
