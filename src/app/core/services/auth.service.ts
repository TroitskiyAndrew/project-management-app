import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ILogin, ILoginFull, IUserNewParams, LoginResponse, UserFace } from '@core/models/auth.model';
import { Store } from '@ngrx/store';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { setUserAction, updateUserAction } from '@redux/actions/current-user.actions';
import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, mergeMap, Observable, of, Subject, takeUntil, tap } from 'rxjs';

@Injectable()
export class AuthService implements OnDestroy {

  private currentUser!: IUser;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private cookieService: CookieService, private store$: Store<AppState>) {
    this.store$.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$)).subscribe((val) => {
        this.currentUser = val as IUser;
      });
  }

  public logIn(loginInfo: ILogin): Observable<LoginResponse> {
    return this.signIn(loginInfo)
      .pipe(
        tap(() => {
          this.findCurrentUserId(loginInfo.login);
        }),
      );
  }

  private signIn(loginInfo: ILogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('signin', loginInfo)
      .pipe(
        tap((resp: LoginResponse) => {
          this.cookieService.set('project-manager-token', resp.token);
        }),
      );
  }


  private findCurrentUserId(userLogin: string): void {
    this.http.get<IUser[]>('users').pipe(
      map((resp: IUser[]) => {
        const currentUser = resp.find(user => user.login === userLogin);
        if (currentUser) {
          this.cookieService.set('project-manager-userId', currentUser.id);
          this.store$.dispatch(setUserAction({ user: currentUser }));
        }
      }),
    ).subscribe();
  }

  private getCurrentUser(id: string): void {
    this.http.get<IUser>(`users/${id}`).pipe(
      tap((user: IUser) => { this.setUser(user); }),
    ).subscribe();
  }

  public createUser(newUser: ILoginFull): Observable<IUser> {
    return this.http.post<IUser>('signup', newUser).pipe(
      tap((user: IUser) => {
        this.cookieService.set('project-manager-userId', user.id);
        this.setUser(user);
        this.signIn({ login: newUser.login, password: newUser.password }).subscribe();
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
      mergeMap(() => this.http.put<IUser>(`users/${this.currentUser.id}`, newParamsFinal)
        .pipe(
          tap(() => {
            const userNewFace: UserFace = {
              name: newParams.name,
              login: newParams.login,
            };
            this.store$.dispatch(updateUserAction({ params: userNewFace }));
          }),
        )),

      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public deleteUser(password: string): Observable<any> {
    return this.signIn({ login: this.currentUser.login, password: password }).pipe(
      mergeMap(() => this.http.delete(`users/${this.currentUser.id}`)),
    );
  }

  public cleareCookie(): void {
    this.cookieService.set('project-manager-token', '');
    this.cookieService.set('project-manager-userId', '');
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
