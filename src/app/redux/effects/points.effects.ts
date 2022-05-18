import { Injectable } from '@angular/core';
import { PointModel } from '@shared/models/board.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { PointsService } from '@core/services/points.service';
import { createPointAction, getAllPointsAction, setPointsAction, deletePointAction, updatePointAction, updateSetOfPointsAction, addPointsToStoreAction, updatePointsInStoreAction, addPointsSocketAction, updatePointsSocketAction } from '@redux/actions/points.actions';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { NotifService } from '@core/services/notif.service';


@Injectable()
export class PointsEffects {

  constructor(private actions$: Actions, private pointsService: PointsService, private store$: Store<AppState>, private notifier: NotifService) { }

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
        map((result: PointModel[]) => setPointsAction({ points: result })),
      )),
      catchError((error) => of(errorResponseAction({ error: error.error }))),
    ),
  );

  deletePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePointAction),
      switchMap((action) => this.pointsService.deletePoint(action.id).pipe(
        catchError(() => {
          this.store$.dispatch(getAllPointsAction());
          return of();
        }),
      ))), { dispatch: false },
  );

  updatePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePointAction),
      switchMap((action) => this.pointsService.updatePoint({ ...action.newParams }, action.id).pipe(
        catchError(() => {
          this.store$.dispatch(getAllPointsAction());
          return of();
        }),
      ))), { dispatch: false },
  );

  updateSetOfPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfPointsAction),
      switchMap((action) => this.pointsService.updateSetOfPoint(action.points).pipe(
        map((points) => updatePointsInStoreAction({ points })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  addPointFromSocet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPointsSocketAction),
      switchMap((action) => this.pointsService.getPointsByIds(action.ids).pipe(
        map((points: PointModel[]) => {
          if (action.notify) {
            this.notifier.notifyAboutSocket('point', 'add', action.ids, action.initUser);
          }
          return addPointsToStoreAction({ points });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

  editPointFromSocet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePointsSocketAction),
      switchMap((action) => this.pointsService.getPointsByIds(action.ids).pipe(
        map((points: PointModel[]) => {
          return updatePointsInStoreAction({ points });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

}
