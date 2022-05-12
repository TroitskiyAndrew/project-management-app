import { Component } from '@angular/core';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { columnsByCurrentBoardSelector, currentBoardSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NewListModalComponent } from 'src/app/board/components/new-list-modal/new-list-modal.component';
import { BoardModel, ColumnModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  currentBoard$: Observable<BoardModel | null | undefined> = this.store$.select(currentBoardSelector);

  columns$: Observable<ColumnModel[]> = this.store$.select(columnsByCurrentBoardSelector);

  constructor(private store$: Store<AppState>, private portalService: PortalService) { }

  openListModal(): void {
    this.portalService.openComponent(NewListModalComponent);
  }
}
