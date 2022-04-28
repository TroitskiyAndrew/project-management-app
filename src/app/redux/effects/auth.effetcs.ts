import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { successResponseAction, errorResponseAction } from '@redux/actions/api-respone.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

  public logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] login'),
      switchMap((action: any) => {
        return this.authService.doLogIn(action.loginInfo);
      }),
      map(() => {
        this.router.navigate(['']);
        return successResponseAction();
      }),
      catchError((error) => of(errorResponseAction(error))),
    ));

  public craeateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] create'),
      switchMap((action: any) => {
        return this.authService.doCreateUser(action.newUser);
      }),
      map(() => {
        this.router.navigate(['']);
        return successResponseAction();
      }),
      catchError((error) => of(errorResponseAction(error))),
    ));

  public editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] edit'),
      switchMap((action: any) => {
        return this.authService.doEditUser(action.newParams);
      }),
      map(() => successResponseAction()),
      catchError((error) => of(errorResponseAction(error))),
    ));

  public deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] delete'),
      map(() => {
        this.authService.doDeleteUser();
      }),
    ), { dispatch: false });

  public logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] logout'),
      map(() => {
        this.router.navigate(['']);
        this.authService.doCleareCookie();
      }),
    ), { dispatch: false });

  public restoreUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] restore'),
      map(() => {
        this.authService.doRestoreUser();
      }),
    ), { dispatch: false });

}
