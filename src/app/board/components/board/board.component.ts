import { Component, OnInit } from '@angular/core';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { getColumnsAction } from '@redux/actions/columns.actions';
import { columnsSelector, currentBoardSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NewListModalComponent } from '@shared/components/new-list-modal/new-list-modal.component';
import { BoardModel, ColumnModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  currentBoard$: Observable<BoardModel | null> = this.store$.select(currentBoardSelector);

  columns$: Observable<ColumnModel[]> = this.store$.select(columnsSelector);

  constructor(private store$: Store<AppState>, private portalService: PortalService) { }

  ngOnInit(): void {
    this.currentBoard$.subscribe(val => console.log(val));
    this.store$.dispatch(getColumnsAction());
    this.columns$.subscribe(val => console.log(val));
  }

  openListModal(): void {
    this.portalService.openComponent(NewListModalComponent);
  }
}
