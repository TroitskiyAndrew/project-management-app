import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState } from '@redux/state.models';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  private currentUser$ = this.store$.select(selectCurrentUser);

  constructor(private router: Router, private store$: Store<AppState>) { }

  canLoad(): Observable<boolean> {
    return this.isAuth();
  }

  canActivate(): Observable<boolean> {
    return this.isAuth();
  }

  private isAuth(): Observable<boolean> {
    return this.currentUser$.pipe(
      tap(val => {
        if (!val) {
          this.router.navigate(['user', 'login']);
        }
      }),
      map(val => Boolean(val)),
    );
  }

}
