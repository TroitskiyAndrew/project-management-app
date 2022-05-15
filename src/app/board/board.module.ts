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
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({}),
  ],
})
export class BoardModule { }
