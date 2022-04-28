import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cleareResponseAction } from '@redux/actions/api-respone.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

  public clearError$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[api response] error', '[api response] success'),
      map(() => {
        return cleareResponseAction();
      }),
    ));
}
