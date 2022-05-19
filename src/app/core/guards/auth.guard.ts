import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser, userLoaded } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { filter, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router: Router, private store$: Store<AppState>) { }

  canLoad(): Observable<boolean> {
    return this.isAuth();
  }

  canActivate(): Observable<boolean> {
    return this.isAuth();
  }

  private isAuth(): Observable<boolean> {
    return this.store$.select(userLoaded).pipe(
      filter((val) => val),
      switchMap(() => this.store$.select(selectCurrentUser)),
      tap((result) => {
        if (!result) {
          this.router.navigate(['']);
        }
      }),
      map((user) => Boolean(user)),
    );
  }

}
