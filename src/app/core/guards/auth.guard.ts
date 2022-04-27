import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }

  canLoad(): boolean {
    return this.isAuth();
  }

  canActivate(): boolean {
    return this.isAuth();
  }

  private isAuth(): boolean {
    const token = this.cookieService.get('project-manager-token');
    if (!token) {
      this.router.navigate(['user', 'login']);
    }
    return Boolean(token);
  }

}
