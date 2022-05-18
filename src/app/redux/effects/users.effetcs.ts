import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { getAllBoardsAction } from '@redux/actions/boards.actions';
import { createUserAction, deleteUserAction, editUserAction, failRestoreUserAction, getAllUsersAction, logInAction, logoutUserAction, restoreUserAction, setAllUserAction, setUserAction, updateUserAction } from '@redux/actions/users.actions';
import { AppState } from '@redux/state.models';
import { map, switchMap, tap, catchError, of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions, private authService: AuthService, private store$: Store<AppState>) { }

  public logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logInAction),
      switchMap((action: any) => this.authService.logIn(action.loginInfo).pipe(
        map((user) => setUserAction({ user })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        ))),
    ),
  );

  public craeateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserAction),
      switchMap((action: any) => this.authService.createUser(action.newUser).pipe(
        map((user) => setUserAction({ user })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        ))),
    ),
  );

  public editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserAction),
      switchMap((action: any) => this.authService.editUser(action.newParams).pipe(
        map((params) => updateUserAction({ params })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        ))),
    ),
  );

  public deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserAction),
      switchMap(() => this.authService.deleteUser().pipe(
        map(() => logoutUserAction()),
        catchError((error) => of(errorResponseAction({ error: error.error })))),
      ),
    ),
  );

  public logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutUserAction),
        tap(() => this.authService.logOut()),
      ), { dispatch: false },
  );

  public restoreUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(restoreUserAction),
        switchMap(() => this.authService.restoreUser().pipe(
          map((user) => user ? setUserAction({ user }) : failRestoreUserAction()),
          catchError(() => of(failRestoreUserAction())),
        )),
      ),
  );

  public restoreFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(failRestoreUserAction),
        tap(() => this.authService.restoreFail()),
      ), { dispatch: false },
  );

  public getAllUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getAllUsersAction),
        switchMap(() => this.authService.getUsers().pipe(
          map((result) => setAllUserAction({ users: result })),
          catchError((error) => of(errorResponseAction({ error: error.error }))),
        )),
      ),
  );

  public setUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setUserAction),
        map(() => {
          this.store$.dispatch(getAllBoardsAction());
          return getAllUsersAction();
        }),
      ),
  );


}
