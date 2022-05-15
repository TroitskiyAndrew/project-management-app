import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { columnsByCurrentBoardSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NewListModalComponent } from 'src/app/board/components/new-list-modal/new-list-modal.component';
import { ColumnModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';
import { PortalService } from '@core/services/portal.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {

  public columns$: Observable<ColumnModel[]> = this.store$.select(
    columnsByCurrentBoardSelector,
  );

  openListModal(): void {
    this.portalService.openComponent(NewListModalComponent);
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log(event);
  }
}
