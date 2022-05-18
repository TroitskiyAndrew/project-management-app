import { Injectable } from '@angular/core';
import { PointModel } from '@shared/models/board.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { PointsService } from '@core/services/points.service';
import { createPointAction, getAllPointsAction, setPointsAction, deletePointAction, updatePointAction, updateSetOfPointsAction, addPointsToStoreAction, deletePointsFromStoreAction, updatePointsInStoreAction } from '@redux/actions/points.actions';
import { errorResponseAction } from '@redux/actions/api-respone.actions';


@Injectable()
export class PointsEffects {

  constructor(private actions$: Actions, private pointsService: PointsService, private store$: Store<AppState>) { }

  createPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPointAction),
      switchMap((action) => this.pointsService.createPoint({ ...action.newPoint }).pipe(
        map((point) => addPointsToStoreAction({ points: [point] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  getPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllPointsAction),
      switchMap(() => this.pointsService.getPointsByUser().pipe(
        map((result: PointModel[]) => this.store$.dispatch(setPointsAction({ points: result }))),
      )),
    ), { dispatch: false },
  );

  deletePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePointAction),
      switchMap((action) => this.pointsService.deletePoint(action.id).pipe(
        map((point) => deletePointsFromStoreAction({ points: [point] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  updatePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePointAction),
      switchMap((action) => this.pointsService.updatePoint({ ...action.newParams }, action.id).pipe(
        map((point) => updatePointsInStoreAction({ points: [point] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  updateSetOfPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfPointsAction),
      switchMap((action) => this.pointsService.updateSetOfPoint(action.points).pipe(
        map((points) => updatePointsInStoreAction({ points })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );
}
