import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { ColumnsService } from '@core/services/columns.service';
import { ColumnModel } from '@shared/models/board.model';
import { createColumnAction, getAllColumnsAction, setColumnsAction, deleteColumnAction, updateColumnAction, updateSetOfColumnsAction, addColumnsToStoreAction, updateColumnsInStoreAction, updateColumnsSocketAction, addColumnsSocketAction } from '@redux/actions/columns.actions';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { NotifService } from '@core/services/notif.service';


@Injectable()
export class ColumnsEffects {

  constructor(private actions$: Actions, private columnsService: ColumnsService, private store$: Store<AppState>, private notifier: NotifService) { }


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
        catchError(() => {
          this.store$.dispatch(getAllColumnsAction());
          return of();
        }),
      ))), { dispatch: false },
  );

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateColumnAction),
      switchMap((action) => this.columnsService.updateColumn({ ...action.newParams }, action.id).pipe(
        catchError(() => {
          this.store$.dispatch(getAllColumnsAction());
          return of();
        }),
      ))), { dispatch: false },
  );

  updateSetOfColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfColumnsAction),
      tap(({ columns }) => this.store$.dispatch(updateColumnsInStoreAction({ columns }))),
      switchMap((action) => this.columnsService.updateSetOfColumns(action.columns).pipe(
        catchError(() => {
          this.store$.dispatch(getAllColumnsAction());
          return of();
        }),
      ))), { dispatch: false },
  );

  addColumnFromSocet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addColumnsSocketAction),
      switchMap((action) => this.columnsService.getColumnsByIds(action.ids).pipe(
        map((columns: ColumnModel[]) => {
          if (action.notify) {
            this.notifier.notifyAboutSocket('column', 'add', action.ids, action.initUser);
          }
          return addColumnsToStoreAction({ columns });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

  editColumnFromSocet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateColumnsSocketAction),
      switchMap((action) => this.columnsService.getColumnsByIds(action.ids).pipe(
        map((columns: ColumnModel[]) => {
          return updateColumnsInStoreAction({ columns });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );
}
