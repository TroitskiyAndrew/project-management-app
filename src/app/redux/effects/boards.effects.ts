import { Injectable } from '@angular/core';
import { BoardsService } from '@core/services/boards.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createBoardAction,
  getBoardsAction,
  successGetBoardsAction,
} from '@redux/actions/boards.actions';
import { map, switchMap } from 'rxjs';
import { BoardModel } from 'src/app/tasks/models/boardModel';

@Injectable()
export class BoardsEffects {
  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoardAction),
      switchMap((action) => {
        return this.boardsService
          .createBoard({ title: action.title })
          .pipe(map(() => getBoardsAction()));
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
  ) {}
}
