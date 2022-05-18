import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NewBoardModalComponent } from '@shared/components/new-board-modal/new-board-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TaskModalComponent } from '@shared/components/task-modal/task-modal.component';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';
import { PointComponent } from './components/task-modal/point/point.component';
import { SearchModalComponent } from '@shared/components/search-modal/search-modal.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    NewBoardModalComponent,
    TaskModalComponent,
    ConfirmComponent,
    PointComponent,
    SearchModalComponent,
    LoadingComponent,
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
    LoadingComponent,
  ],
})
export class SharedModule { }
