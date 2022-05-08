import { Injectable } from '@angular/core';
import { BoardModel } from '@shared/models/board.model';
import { BoardsService } from '@core/services/boards.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createBoardAction,
  getBoardsAction,
  successGetBoardsAction,
} from '@redux/actions/boards.actions';
import { NotifierService } from 'angular-notifier';
import { map, switchMap, tap } from 'rxjs';


@Injectable()
export class BoardsEffects {
  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoardAction),
      switchMap((action) => {
        return this.boardsService.createBoard({ title: action.title }).pipe(
          map(() => getBoardsAction()),
          tap(() => {
            this.notifier.notify('success', 'Successfull created');
          }),
        );
      }),
    ),
  );

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBoardsAction),
      switchMap(() => {
        return this.boardsService.getBoards().pipe(
          map((response) => {
            return successGetBoardsAction({
              boards: response as BoardModel[],
            });
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private boardsService: BoardsService,
    private notifier: NotifierService,
  ) { }
}
