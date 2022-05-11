import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { ColumnsService } from '@core/services/columns.service';
import { ColumnModel } from '@shared/models/board.model';
import { createColumnAction, getColumnsAction, setColumnsAction, deleteColumnAction, updateColumnAction, updateSetOfColumnsAction } from '@redux/actions/columns.actions';
import { getTasksAction } from '@redux/actions/tasks.actions';


@Injectable()
export class ColumnsEffects {

  constructor(private actions$: Actions, private columnsService: ColumnsService, private store$: Store<AppState>) { }


  createColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createColumnAction),
      switchMap((action) => {
        return this.columnsService.createColumn({ ...action.newColumn });
      }),
    ), { dispatch: false },
  );

  getColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getColumnsAction),
      switchMap(() => this.columnsService.getColumns().pipe(
        map((result: ColumnModel[] | null) => {
          if (result) {
            this.store$.dispatch(setColumnsAction({ columns: result }));
            this.store$.dispatch(getTasksAction());

          }
        }),
      )),
    ), { dispatch: false },
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteColumnAction),
      switchMap((action) => this.columnsService.deleteColumn(action.id)),
    ), { dispatch: false },
  );

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateColumnAction),
      switchMap((action) => this.columnsService.updateColumn({ ...action.newParams }, action.id)),
    ), { dispatch: false },
  );

  updateSetOfColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfColumnsAction),
      switchMap((action) => this.columnsService.updateSetOfColumns(action.columns)),
    ), { dispatch: false },
  );
}
