import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getBoardsAction } from '@redux/actions/boards.actions';
import { createUserAction, deleteUserAction, editUserAction, getUsersAction, logInAction, logoutUserAction, restoreUserAction, setAllUserAction, setUserAction } from '@redux/actions/users.actions';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions, private authService: AuthService, private store$: Store<AppState>) { }

  public logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logInAction),
      switchMap((action: any) => this.authService.logIn(action.loginInfo)),
    ), { dispatch: false },
  );

  public craeateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserAction),
      switchMap((action: any) => this.authService.createUser(action.newUser)),
    ), { dispatch: false },
  );

  public editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserAction),
      switchMap((action: any) => this.authService.editUser(action.newParams)),
    ), { dispatch: false },
  );

  public deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserAction),
      switchMap(() => this.authService.deleteUser()
        .pipe(map(() => logoutUserAction()))),
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
        map(() => this.authService.restoreUser()),
      ), { dispatch: false },
  );

  public setUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setUserAction),
        map(() => {
          this.store$.dispatch(getBoardsAction());
          return getUsersAction();
        }),
      ),
  );

  public getAllUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUsersAction),
        switchMap(() => this.authService.getUsers().pipe(
          map((result: IUser[] | null) => setAllUserAction({ users: result || [] })),
        )),
      ),
  );
}
