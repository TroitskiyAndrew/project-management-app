import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store$: Store<AppState>) { }

  canLoad(): Observable<boolean> {
    return this.notAuth();
  }

  canActivate(): Observable<boolean> {
    return this.notAuth();
  }

  private notAuth(): Observable<boolean> {
    return this.store$.select(selectCurrentUser).pipe(
      filter((val) => val !== undefined),
      tap((result) => {
        if (result) {
          this.router.navigate(['']);
        }
      }),
      map((user) => !Boolean(user)),
    );
  }
}
