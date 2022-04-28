import { Injectable } from '@angular/core';
import { BoardsService } from '@core/services/boards.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createBoardAction,
  getBoardsAction,
  succesCreateBoardAction,
  successGetBoardsAction,
} from '@redux/actions/tasks.actions';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs';
import { BoardModel } from 'src/app/tasks/models/boardModel';
// import { debounceTime, exhaustMap, filter, map } from 'rxjs';

@Injectable()
export class TasksEffects {
  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoardAction),
      exhaustMap((action) => {
        return this.boardsService
          .createBoard({ title: action.title })
          .pipe(map(() => getBoardsAction()));
      }),
    ),
  );

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBoardsAction),
      exhaustMap((action) => {
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
