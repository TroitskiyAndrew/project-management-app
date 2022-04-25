import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ISignUp, LoginResponse } from '@core/models/auth.model';
import { Store } from '@ngrx/store';
import { clearUserAction, setUserAction } from '@redux/actions/current-user.actions';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of, switchMap, take, tap } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService, private store$: Store<AppState>) { }

  public logIn(login: ILogin): Observable<boolean> {
    return this.http.post<LoginResponse>('signin', login)
      .pipe(
        tap((resp: LoginResponse) => {
          this.cookieService.set('project-manager-token', resp.token);
          this.setUser(login.login);
        }),
        switchMap(() => of(true)),
        catchError(() => of(false)),
      );
  }

  public regestry(neUser: ISignUp): Observable<boolean> {
    return this.http.post<ISignUp>('signup', neUser)
      .pipe(
        tap((resp: ISignUp) => {
          const login: ILogin = {
            login: resp.login,
            password: resp.password,
          };
          this.logIn(login).pipe(take(1)).subscribe();
        }),
        switchMap(() => of(true)),
        catchError(() => of(false)),
      );
  }

  public logOut(): void {
    this.store$.dispatch(clearUserAction());
  }

  public setUser(login: string) {
    this.http.get<IUser[]>('users').subscribe(resp => {
      const currentUser = resp.find(user => user.login === login);
      if (currentUser) {
        this.store$.dispatch(setUserAction({ user: currentUser }));
      }
    });
  }
}
