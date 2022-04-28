import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ILogin, ILoginFull, LoginResponse } from '@core/models/auth.model';
import { Store } from '@ngrx/store';
import { logoutUserAction, setUserAction, updateUserAction } from '@redux/actions/current-user.actions';
import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState } from '@redux/state.models';
import { IStateUser, IUser } from '@shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, Subject, take, takeUntil, tap } from 'rxjs';

@Injectable()
export class AuthService implements OnDestroy {

  private currentUser!: IStateUser;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private cookieService: CookieService, private store$: Store<AppState>) {
    this.store$.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$)).subscribe((val) => {
        this.currentUser = val as IStateUser;
      });
  }

  public doLogIn(loginInfo: ILogin): Observable<LoginResponse> {
    return this.doSignIn(loginInfo)
      .pipe(
        tap(() => {
          this.cookieService.set('project-manager-password', loginInfo.password);
          this.doFindCurrentUserId(loginInfo.login);
        }),
      );
  }

  private doSignIn(loginInfo: ILogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('signin', loginInfo)
      .pipe(
        tap((resp: LoginResponse) => {
          this.cookieService.set('project-manager-token', resp.token);
        }),
      );
  }


  private doFindCurrentUserId(userLogin: string): void {
    this.http.get<IUser[]>('users').pipe(
      take(1),
      map((resp: IUser[]) => {
        const currentUser = resp.find(user => user.login === userLogin);
        if (currentUser) {
          this.cookieService.set('project-manager-userId', currentUser.id);
          const userForState: IStateUser = {
            ...currentUser,
            password: this.cookieService.get('project-manager-password'),
          };
          this.store$.dispatch(setUserAction({ user: userForState }));
        }
      }),
    ).subscribe();
  }

  private doGetCurrentUser(id: string): void {
    this.http.get<IUser>(`users/${id}`).pipe(
      take(1),
      tap((user: IUser) => { this.setUser(user); }),
    ).subscribe();
  }

  public doCreateUser(newUser: ILoginFull): Observable<IUser> {
    return this.http.post<IUser>('signup', newUser).pipe(
      take(1),
      tap((user: IUser) => {
        this.cookieService.set('project-manager-password', newUser.password);
        this.cookieService.set('project-manager-userId', user.id);
        this.setUser(user);
        this.doSignIn({ login: newUser.login, password: newUser.password }).pipe(take(1)).subscribe();
      }),
    );
  }

  private setUser(user: IUser): void {
    const userForState: IStateUser = {
      ...user,
      password: this.cookieService.get('project-manager-password'),
    };
    this.store$.dispatch(setUserAction({ user: userForState }));
  }

  public doEditUser(newParams: ILoginFull): Observable<IUser> {
    return this.http.put<IUser>(`users/${this.currentUser.id}`, newParams)
      .pipe(
        tap(() => this.store$.dispatch(updateUserAction({ params: newParams }))),
      );
  }

  public doDeleteUser(): void {
    this.http.delete(`users/${this.currentUser.id}`);
    this.store$.dispatch(logoutUserAction());
  }

  public doCleareCookie(): void {
    this.cookieService.set('project-manager-password', '');
    this.cookieService.set('project-manager-token', '');
    this.cookieService.set('project-manager-userId', '');
  }

  public doRestoreUser(): void {
    const id = this.cookieService.get('project-manager-userId');
    if (id) {
      this.doGetCurrentUser(id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
