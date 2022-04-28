import { Injectable } from '@angular/core';
import { BoardsService } from '@core/services/boards.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createBoardAction,
  succesCreateBoardAction,
} from '@redux/actions/tasks.actions';
import { exhaustMap, map, tap } from 'rxjs';
// import { debounceTime, exhaustMap, filter, map } from 'rxjs';

@Injectable()
export class TasksEffects {
  createBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        // ofType(createBoardAction),
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
      ),
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
