import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { ColumnsService } from '@core/services/columns.service';
import { ColumnModel } from '@shared/models/board.model';
import { createColumnAction, getAllColumnsAction, setColumnsAction, deleteColumnAction, updateColumnAction, updateSetOfColumnsAction, addColumnsToStoreAction, deleteColumnsFromStoreAction, updateColumnsInStoreAction } from '@redux/actions/columns.actions';
import { errorResponseAction } from '@redux/actions/api-respone.actions';


@Injectable()
export class ColumnsEffects {

  constructor(private actions$: Actions, private columnsService: ColumnsService, private store$: Store<AppState>) { }


  createColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createColumnAction),
      switchMap((action) => this.columnsService.createColumn({ ...action.newColumn }).pipe(
        map((column) => addColumnsToStoreAction({ columns: [column] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  getColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllColumnsAction),
      switchMap(() => this.columnsService.getColumnsByUser().pipe(
        map((columns: ColumnModel[]) => setColumnsAction({ columns })),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteColumnAction),
      switchMap((action) => this.columnsService.deleteColumn(action.id).pipe(
        map((column) => deleteColumnsFromStoreAction({ columns: [column] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateColumnAction),
      switchMap((action) => this.columnsService.updateColumn({ ...action.newParams }, action.id).pipe(
        map((column) => updateColumnsInStoreAction({ columns: [column] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  updateSetOfColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfColumnsAction),
      switchMap((action) => this.columnsService.updateSetOfColumns(action.columns).pipe(
        map((columns) => updateColumnsInStoreAction({ columns })),
        catchError(() => of(getAllColumnsAction()),
        )))),
  );
}
