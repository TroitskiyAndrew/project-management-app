import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NewBoardModalComponent } from '@shared/components/new-board-modal/new-board-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TaskModalComponent } from '@shared/components/task-modal/task-modal.component';



@NgModule({
  declarations: [
    NewBoardModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({}),
  ],
  exports: [
    NewBoardModalComponent,
  ],
})
export class SharedModule { }
