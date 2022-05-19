import { Injectable } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { getAllBoardsAction } from '@redux/actions/boards.actions';
import { logInAction, setUserAction, createUserAction, editUserAction, updateUserAction, deleteUserAction, logoutUserAction, restoreUserAction, failRestoreUserAction, getAllUsersAction, setAllUserAction, addUsersSocketAction, addUsersToStoreAction, updateUsersSocketAction, updateUsersInStoreAction } from '@redux/actions/users.actions';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { map, switchMap, tap, catchError, of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions, private usersService: UsersService, private store$: Store<AppState>) { }

  public logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logInAction),
      switchMap((action: any) => this.usersService.logIn(action.loginInfo).pipe(
        map((user) => setUserAction({ user })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        ))),
    ),
  );

  public craeateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserAction),
      switchMap((action: any) => this.usersService.createUser(action.newUser).pipe(
        map((user) => setUserAction({ user })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        ))),
    ),
  );

  public editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserAction),
      switchMap((action: any) => this.usersService.editUser(action.newParams).pipe(
        map((params) => updateUserAction({ params })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        ))),
    ),
  );

  public deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserAction),
      switchMap(() => this.usersService.deleteUser().pipe(
        map(() => logoutUserAction()),
        catchError((error) => of(errorResponseAction({ error: error.error })))),
      ),
    ),
  );

  public logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutUserAction),
        tap(() => this.usersService.logOut()),
      ), { dispatch: false },
  );

  public restoreUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(restoreUserAction),
        switchMap(() => this.usersService.restoreUser().pipe(
          map((user) => user ? setUserAction({ user }) : failRestoreUserAction()),
          catchError(() => of(failRestoreUserAction())),
        )),
      ),
  );

  public restoreFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(failRestoreUserAction),
        tap(() => this.usersService.restoreFail()),
      ), { dispatch: false },
  );

  public getAllUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getAllUsersAction),
        switchMap(() => this.usersService.getUsers().pipe(
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

  addUserFromSocet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUsersSocketAction),
      switchMap((action) => this.usersService.getUsersByIds(action.ids).pipe(
        map((users: IUser[]) => {
          return addUsersToStoreAction({ users });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

  editUserFromSocet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUsersSocketAction),
      switchMap((action) => this.usersService.getUsersByIds(action.ids).pipe(
        map((users: IUser[]) => {
          return updateUsersInStoreAction({ users });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

}
