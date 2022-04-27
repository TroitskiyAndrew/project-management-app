import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, ISignUp, LoginResponse } from '@core/models/auth.model';
import { Store } from '@ngrx/store';
import { clearUserAction, setUserAction } from '@redux/actions/current-user.actions';
import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState } from '@redux/state.models';
import { IStateUser, IUser } from '@shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

@Injectable()
export class AuthService implements OnDestroy {

  private currentUser!: IStateUser;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private cookieService: CookieService, private store$: Store<AppState>, private router: Router) {
    this.store$.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$)).subscribe((val) => {
        this.currentUser = val as IStateUser;
      });
  }

  public logIn(loginInfo: ILogin): Observable<boolean> {
    return this.http.post<LoginResponse>('signin', loginInfo)
      .pipe(
        tap((resp: LoginResponse) => {
          this.cookieService.set('project-manager-token', resp.token);
          this.setUser(loginInfo);
          this.router.navigate(['main']);
        }),
        switchMap(() => of(true)),
        catchError(() => of(false)),
      );
  }

  public regestry(newUser: ISignUp): Observable<boolean> {
    return this.http.post<ISignUp>('signup', newUser)
      .pipe(
        tap(() => {
          const loginInfo: ILogin = {
            login: newUser.login,
            password: newUser.password,
          };
          this.logIn(loginInfo).pipe(take(1)).subscribe();
        }),
        switchMap(() => of(true)),
        catchError(() => of(false)),
      );
  }

  public editUser(newUserParams: ISignUp): void {
    this.http.put<ISignUp>(`users/${this.currentUser.id}`, newUserParams)
      .pipe(
        take(1),
        tap(() => {
          const loginInfo: ILogin = {
            login: newUserParams.login,
            password: newUserParams.password,
          };
          this.setUser(loginInfo);
        }),
      ).subscribe();
  }

  public logOut(): void {
    this.store$.dispatch(clearUserAction());
  }

  public setUser(loginInfo: ILogin) {
    this.http.get<IUser[]>('users').subscribe(resp => {
      const currentUser = resp.find(user => user.login === loginInfo.login);
      if (currentUser) {
        const userForState: IStateUser = {
          ...currentUser,
          password: loginInfo.password,
        };
        this.store$.dispatch(setUserAction({ user: userForState }));
      }
    });
  }

  public deleteUser() {
    this.http.delete(`users/${this.currentUser.id}`).subscribe();
    this.logOut();
    this.router.navigate(['main']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
