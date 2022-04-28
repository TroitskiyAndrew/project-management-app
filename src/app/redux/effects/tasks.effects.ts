import { Injectable } from '@angular/core';
import { BoardsService } from '@core/services/boards.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createBoardAction,
  succesCreateBoardAction,
} from '@redux/actions/tasks.actions';
import { exhaustMap, map, switchMap, tap } from 'rxjs';
// import { debounceTime, exhaustMap, filter, map } from 'rxjs';

@Injectable()
export class TasksEffects {
  createBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createBoardAction),
        map((action) => {
          return this.boardsService.createBoard({title: action.title});
        }),
        map((response) => {
          console.log(response);
        }),
      ),
    { dispatch: false },
    // exhaustMap((action) => {
    //   this.boardsService.createBoard().pipe(
    //     map((response) => {
    //       console.log(response);
    //       succesCreateBoardAction();
    //     }),
    //   );
    // }),

    // tap(() => {
    //   console.log('effect');
    //   this.boardsService
    //     .createBoard()
    //     .pipe(map((response) => console.log(response)));
    // }),
    // exhaustMap((action) =>
    //   this.boardsService
    //     .createBoard()
    //     .pipe(
    //       map((response) =>
    //         console.log(response)
    //         loadExternalSuccess({ videos: response.items }),
    //       ),
    //     ),
    // ),
    // this.actions$.pipe(
    //   ofType(loadExternal),
    //   filter((action) => action.key.length >= 3),
    //   debounceTime(300),
    //   exhaustMap((action) =>
    //     this.videoRequestService
    //       .searchVideos(action.key)
    //       .pipe(
    //         map((response) => loadExternalSuccess({ videos: response.items })),
    //       ),
    //   ),
    // ),
  );

  constructor(
    private actions$: Actions,
    private boardsService: BoardsService,
  ) {}
}
