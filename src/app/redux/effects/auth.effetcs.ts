import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private cookieService: CookieService) { }

  public loadItems$ = createEffect(
    () => this.actions$.pipe(
      ofType('[current User] clear'),
      tap(() => {
        this.cookieService.delete('project-manager-token');
        this.router.navigate(['login']);
      }),
    ),
    { dispatch: false });

}
