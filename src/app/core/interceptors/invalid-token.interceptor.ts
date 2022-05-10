import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { logoutUserAction } from '@redux/actions/users.actions';
import { AppState } from '@redux/state.models';

@Injectable()
export class InvalidTokenInterceptor implements HttpInterceptor {

  constructor(private store$: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.Response && event.status == 401) {
        this.store$.dispatch(logoutUserAction());
      }
    }));
  }
}
