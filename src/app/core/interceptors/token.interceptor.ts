import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { Guid } from 'guid-typescript';
import { addGuidAction, removeGuidAction } from '@redux/actions/enviroment.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {

  private destroy$ = new Subject<void>();

  private currentUserId = 'unauthorized';

  constructor(private cookieService: CookieService, private store$: Store<AppState>) {
    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe((id) => this.currentUserId = id || 'unauthorized');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newGuid = Guid.create().toString();
    this.store$.dispatch(addGuidAction({ guid: newGuid }));
    setTimeout(() => {
      this.store$.dispatch(removeGuidAction({ guid: newGuid }));
    }, 1000 * 60 * 2);
    return next.handle(request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${this.cookieService.get('project-manager-token') || ''}`)
        .set('Guid', newGuid)
        .set('initUser', this.currentUserId),
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
