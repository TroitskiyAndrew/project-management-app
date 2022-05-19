import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { WorkspacePageComponent } from './pages/workspace-page/workspace-page.component';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewListModalComponent } from 'src/app/board/components/new-list-modal/new-list-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '@shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    WorkspacePageComponent,
    BoardComponent,
    ListComponent,
    CardComponent,
    NewListModalComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    TranslateModule.forChild({}),
    NgMultiSelectDropDownModule.forRoot(),
    LayoutModule,
  ],
})
export class BoardModule {}
