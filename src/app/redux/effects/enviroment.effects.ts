import { Injectable } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { changeLangAction } from '@redux/actions/enviroment.actions';
import { map } from 'rxjs';


@Injectable()
export class EnviromentEffects {

  constructor(private actions$: Actions, private localization: LocalizationService) { }

  changeLang$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeLangAction),
      map((action: any) => {
        return this.localization.changeLang(action.lang);
      }),
    ), { dispatch: false },
  );
}
