import { Injectable } from '@angular/core';
import { BoardModel } from '@shared/models/board.model';
import { BoardsService } from '@core/services/boards.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { getColumnsAction } from '@redux/actions/columns.actions';
import { createBoardAction, getBoardsAction, setBoardsAction, deleteBoardAction, updateBoardAction } from '@redux/actions/boards.actions';
import { getTasksAction } from '@redux/actions/tasks.actions';
import { getFilesAction } from '@redux/actions/files.actions';
import { getPointsAction } from '@redux/actions/points.actions';


@Injectable()
export class BoardsEffects {

  constructor(private actions$: Actions, private boardsService: BoardsService, private store$: Store<AppState>) { }

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoardAction),
      switchMap((action) => {
        return this.boardsService.createBoard(action.newBoard);
      }),
    ), { dispatch: false },
  );

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBoardsAction),
      switchMap(() => this.boardsService.getBoards().pipe(
        map((result: BoardModel[] | null) => {
          if (result) {
            this.store$.dispatch(setBoardsAction({ boards: result }));
            this.store$.dispatch(getColumnsAction({ boards: result.map(item => item._id) }));
            this.store$.dispatch(getTasksAction({ boards: result.map(item => item._id) }));
            this.store$.dispatch(getFilesAction({ boards: result.map(item => item._id) }));
            this.store$.dispatch(getPointsAction({ boards: result.map(item => item._id) }));
          }
          return setBoardsAction({ boards: result || [] });
        }),
      )),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBoardAction),
      switchMap((action) => this.boardsService.deleteBoard(action.id)),
    ), { dispatch: false },
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBoardAction),
      switchMap((action) => this.boardsService.updateBoard({ ...action.newParams }, action.id)),
    ), { dispatch: false },
  );

}
