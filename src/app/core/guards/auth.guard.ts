import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  canLoad(): Observable<boolean> {
    return this.isAuth();
  }

  canActivate(): Observable<boolean> {
    return this.isAuth();
  }

  private isAuth(): Observable<boolean> {
    if (!this.cookieService.get('project-manager-token')) {
      return of(false);
    }
    return this.authService.getUsers().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

}
