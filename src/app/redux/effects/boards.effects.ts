import { Injectable } from '@angular/core';
import { BoardModel } from '@shared/models/board.model';
import { BoardsService } from '@core/services/boards.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { getAllColumnsAction } from '@redux/actions/columns.actions';

import { getAllTasksAction } from '@redux/actions/tasks.actions';
import { getAllFilesAction } from '@redux/actions/files.actions';
import { getAllPointsAction } from '@redux/actions/points.actions';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { createBoardAction, addBoardsToStoreAction, getAllBoardsAction, setBoardsAction, deleteBoardAction, deleteBoardsFromStoreAction, updateBoardAction, updateBoardsInStoreAction } from '@redux/actions/boards.actions';


@Injectable()
export class BoardsEffects {

  constructor(private actions$: Actions, private boardsService: BoardsService, private store$: Store<AppState>) { }

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoardAction),
      switchMap((action) => this.boardsService.createBoard(action.newBoard).pipe(
        map((board) => addBoardsToStoreAction({ boards: [board] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllBoardsAction),
      switchMap(() => this.boardsService.getBoardsByUser().pipe(
        map((boards: BoardModel[]) => {
          this.store$.dispatch(getAllColumnsAction());
          this.store$.dispatch(getAllTasksAction());
          this.store$.dispatch(getAllFilesAction());
          this.store$.dispatch(getAllPointsAction());
          return setBoardsAction({ boards });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBoardAction),
      switchMap((action) => this.boardsService.deleteBoard(action.id).pipe(
        map((board) => deleteBoardsFromStoreAction({ boards: [board] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBoardAction),
      switchMap((action) => this.boardsService.updateBoard({ ...action.newParams }, action.id).pipe(
        map((board) => updateBoardsInStoreAction({ boards: [board] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

}
