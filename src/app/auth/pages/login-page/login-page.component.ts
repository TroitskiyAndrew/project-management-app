import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEndPoint } from '@redux/selectors/router.selectors';
import { AppState } from '@redux/state.models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public isLogin = true;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.store$.select(selectEndPoint).pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.isLogin = val == 'login';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
