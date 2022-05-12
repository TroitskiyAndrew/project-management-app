import { Injectable } from '@angular/core';
import { PointModel } from '@shared/models/board.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { PointsService } from '@core/services/points.service';
import { createPointAction, getPointsAction, setPointsAction, deletePointAction, updatePointAction, updateSetOfPointsAction } from '@redux/actions/points.actions';


@Injectable()
export class PointsEffects {

  constructor(private actions$: Actions, private pointsService: PointsService, private store$: Store<AppState>) { }

  createPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPointAction),
      switchMap((action) => {
        return this.pointsService.createPoint({ ...action.newPoint });
      }),
    ), { dispatch: false },
  );

  getPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPointsAction),
      switchMap((action: any) => this.pointsService.getPoints(action.boards).pipe(
        map((result: PointModel[] | null) => {
          if (result) {
            this.store$.dispatch(setPointsAction({ points: result }));
          }
        }),
      )),
    ), { dispatch: false },
  );

  deletePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePointAction),
      switchMap((action) => this.pointsService.deletePoint(action.id)),
    ), { dispatch: false },
  );

  updatePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePointAction),
      switchMap((action) => this.pointsService.updatePoint({ ...action.newParams }, action.id)),
    ), { dispatch: false },
  );

  updateSetOfPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfPointsAction),
      switchMap((action) => this.pointsService.updateSetOfPoint(action.points)),
    ), { dispatch: false },
  );
}
