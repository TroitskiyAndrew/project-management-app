import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getBoardsAction } from '@redux/actions/boards.actions';
import { boardsSelector } from '@redux/selectors/boards.selectors';
import { AppState, BoardsState } from '@redux/state.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
})
export class WorkspacePageComponent implements OnInit {
  panelOpenState = false;

  sidebarOpenState = false;

  boards$: Observable<BoardsState> = this.store.pipe(select(boardsSelector));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getBoardsAction());
  }
}
