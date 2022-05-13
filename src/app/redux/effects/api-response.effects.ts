import { Injectable } from '@angular/core';
import { NotifService } from '@core/services/notif.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cleareResponseAction, errorResponseAction, successResponseAction } from '@redux/actions/api-respone.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResposeEffects {
  constructor(private actions$: Actions, private respHandler: NotifService) { }

  public success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(successResponseAction),
      map((action: any) => {
        this.respHandler.handleSuccess(action.message);
        return cleareResponseAction();
      }),
    ));

  public error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(errorResponseAction),
      map((action: any) => {
        this.respHandler.handleError(action.error);
        return cleareResponseAction();
      }),
    ));
}
