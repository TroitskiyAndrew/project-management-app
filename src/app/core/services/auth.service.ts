import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, ILoginFull, IUserNewParams, LoginResponse, UserFace } from '@core/models/auth.model';
import { Store } from '@ngrx/store';
import { errorResponseAction, successResponseAction } from '@redux/actions/api-respone.actions';
import { setUserAction, updateUserAction } from '@redux/actions/users.actions';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { catchError, mergeMap, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Injectable()
export class AuthService implements OnDestroy {

  private currentUser!: IUser;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private cookieService: CookieService, private store$: Store<AppState>, private router: Router) {
    this.store$.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$)).subscribe((val) => {
        this.currentUser = val as IUser;
      });
  }

  public logIn(loginInfo: ILogin): Observable<LoginResponse | null> {
    return this.signIn(loginInfo)
      .pipe(
        tap((result) => {
          if (result) {
            this.findCurrentUserId(loginInfo.login);
          }
        }),
      );
  }

  private signIn(loginInfo: ILogin): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>('auth/signin', loginInfo, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        tap((resp: LoginResponse) => {
          this.cookieService.set('project-manager-token', resp.token);
          this.router.navigate(['']);
          this.store$.dispatch(successResponseAction({ message: 'Successfull logged in' }));
        }),
        catchError((error) => {
          this.store$.dispatch(errorResponseAction({ error: error.error }));
          return of(null);
        }),
      );
  }


  private findCurrentUserId(userLogin: string): void {
    this.http.get<IUser[]>('users').pipe(
      switchMap((resp: IUser[]) => {
        const currentUser = resp.find(user => user.login === userLogin);
        if (currentUser) {
          this.cookieService.set('project-manager-userId', currentUser._id);
          this.setUser(currentUser);
        }
        return of();
      }),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of();
      }),
    ).subscribe();
  }

  private getCurrentUser(id: string): void {
    this.http.get<IUser>(`users/${id}`).pipe(
      tap((user: IUser) => { this.setUser(user); }),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of();
      }),
    ).subscribe();
  }

  public getUsers(): Observable<IUser[] | null> {
    return this.http.get<IUser[]>('users').pipe(
      catchError(() => {
        return of();
      }),
    );
  }

  public createUser(newUser: ILoginFull): Observable<IUser> {
    return this.http.post<IUser>('auth/signup', newUser, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((user: IUser) => {
        this.cookieService.set('project-manager-userId', user._id);
        this.store$.dispatch(successResponseAction({ message: 'Successfull registrated' }));
        this.signIn({ login: newUser.login, password: newUser.password }).pipe(tap(() => this.setUser(user))).subscribe();
      }),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of();
      }),
    );
  }

  private setUser(user: IUser): void {
    this.store$.dispatch(setUserAction({ user: user }));
  }

  public editUser(newParams: IUserNewParams): Observable<IUser | null> {
    const newParamsFinal: ILoginFull = {
      name: newParams.name,
      login: newParams.login,
      password: newParams.newPassword || newParams.password,
    };
    return this.signIn({ login: this.currentUser.login, password: newParams.password }).pipe(
      mergeMap(() => this.http.put<IUser>(`users/${this.currentUser._id}`, newParamsFinal, { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          tap(() => {
            const userNewFace: UserFace = {
              name: newParams.name,
              login: newParams.login,
            };
            this.store$.dispatch(successResponseAction({ message: 'Successfull edited' }));
            this.store$.dispatch(updateUserAction({ params: userNewFace }));
          }),
          catchError((error) => {
            this.store$.dispatch(errorResponseAction({ error: error.error }));
            return of();
          }),
        )),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public deleteUser(): Observable<IUser | null> {
    return this.http.delete<IUser>(`users/${this.currentUser._id}`).pipe(
      tap(() => {
        this.store$.dispatch(successResponseAction({ message: 'Successfull deleted' }));
      }),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public logOut(): void {
    this.cookieService.set('project-manager-token', '');
    this.cookieService.set('project-manager-userId', '');
    this.store$.dispatch(successResponseAction({ message: 'Successfull logged out' }));
    this.router.navigate(['']);
  }


  public restoreUser(): void {
    const id = this.cookieService.get('project-manager-userId');
    if (id) {
      this.getCurrentUser(id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
