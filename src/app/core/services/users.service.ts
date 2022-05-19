import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, ILoginFull, IUser, IUserNewParams, LoginResponse, UserFace } from '@shared/models/user.model';
import { Store } from '@ngrx/store';
import { successResponseAction } from '@redux/actions/api-respone.actions';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { CookieService } from 'ngx-cookie-service';
import { mergeMap, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Injectable()
export class UsersService implements OnDestroy {

  private currentUser!: IUser;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private cookieService: CookieService, private store$: Store<AppState>, private router: Router) {
    this.store$.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$)).subscribe((val) => {
        this.currentUser = val as IUser;
      });
  }

  public logIn(loginInfo: ILogin): Observable<IUser> {
    return this.signIn(loginInfo)
      .pipe(
        switchMap(() => {
          this.store$.dispatch(successResponseAction({ message: '${notifications.user.signIn}' }));
          return this.findCurrentUserId(loginInfo.login);
        }),
      );
  }

  private signIn(loginInfo: ILogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/signin', loginInfo, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        tap((resp: LoginResponse) => {
          this.cookieService.set('project-manager-token', resp.token);
          this.router.navigate(['']);
        }),
      );
  }


  private findCurrentUserId(userLogin: string): Observable<IUser> {
    return this.http.get<IUser[]>('users').pipe(
      switchMap((resp: IUser[]) => {
        const currentUser = resp.find(user => user.login === userLogin) as IUser;
        this.cookieService.set('project-manager-userId', currentUser?._id || '');
        return of(currentUser);
      }),
    );
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users');
  }

  public getUsersByIds(ids: string[]): Observable<IUser[]> {
    return this.http.get<IUser[]>('users', { params: new HttpParams().set('ids', ids.join(', ')) });
  }

  public createUser(newUser: ILoginFull): Observable<IUser> {
    return this.http.post<IUser>('auth/signup', newUser, { headers: { 'Content-Type': 'application/json' } }).pipe(
      switchMap((user: IUser) => {
        this.store$.dispatch(successResponseAction({ message: '${notifications.user.signUp}' }));
        this.cookieService.set('project-manager-userId', user._id);
        return this.signIn({ login: newUser.login, password: newUser.password }).pipe(switchMap(() => of(user)));
      }),
    );
  }

  public editUser(newParams: IUserNewParams): Observable<UserFace> {
    const newParamsFinal: ILoginFull = {
      name: newParams.name,
      login: newParams.login,
      password: newParams.newPassword || newParams.password,
    };
    return this.signIn({ login: this.currentUser.login, password: newParams.password }).pipe(
      mergeMap(() => this.http.put<IUser>(`users/${this.currentUser._id}`, newParamsFinal, { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          switchMap(() => {
            const userNewFace: UserFace = {
              name: newParams.name,
              login: newParams.login,
            };
            this.store$.dispatch(successResponseAction({ message: '${notifications.user.edit}' }));
            return of(userNewFace);
          }),
        )),
    );
  }

  public deleteUser(): Observable<IUser | null> {
    return this.http.delete<IUser>(`users/${this.currentUser._id}`).pipe(
      tap(() => {
        this.store$.dispatch(successResponseAction({ message: '${notifications.user.delete}' }));
      }),
    );
  }

  public logOut(): void {
    this.cookieService.set('project-manager-token', '');
    this.cookieService.set('project-manager-userId', '');
    this.store$.dispatch(successResponseAction({ message: '${notifications.user.lofOut}' }));
    this.router.navigate(['']);
  }

  public restoreUser(): Observable<IUser | null> {
    const id = this.cookieService.get('project-manager-userId');
    if (id) {
      return this.http.get<IUser>(`users/${id}`).pipe();
    }
    return of(null);
  }

  public restoreFail(): void {
    this.cookieService.set('project-manager-token', '');
    this.cookieService.set('project-manager-userId', '');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
