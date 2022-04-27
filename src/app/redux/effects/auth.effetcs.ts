import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  public logOut$ = createEffect(
    () => this.actions$.pipe(
      ofType('[current User] clear'),
      tap(() => {
        this.cookieService.set('project-manager-token', '');
        this.cookieService.set('project-manager-userLogin', '');
        this.cookieService.set('project-manager-userPass', '');
        this.router.navigate(['user', 'login']);
      }),
    ),
    { dispatch: false });

  public logIn$ = createEffect(
    () => this.actions$.pipe(
      ofType('[current User] set'),
      tap((action: any) => {
        this.cookieService.set('project-manager-userLogin', action.user.login);
        this.cookieService.set('project-manager-userPass', action.user.password);
      }),
    ),
    { dispatch: false });

  public checkUser$ = createEffect(
    () => this.actions$.pipe(
      ofType('[current User] check'),
      tap(() => {
        const login = this.cookieService.get('project-manager-userLogin');
        const password = this.cookieService.get('project-manager-userPass');
        if (login) {
          this.authService.setUser({ login: login, password: password });
        }
      }),
    ),
    { dispatch: false });

}
