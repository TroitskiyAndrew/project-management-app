import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '@core/models/auth.model';
import { Store } from '@ngrx/store';
import { logInAction } from '@redux/actions/current-user.actions';
import { selectApiErrorCode } from '@redux/selectors/api-response.selectors';
import { AppState } from '@redux/state.models';
import { skip, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public loginForm!: FormGroup;

  public authError = '';

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.store$.select(selectApiErrorCode).pipe(
      skip(1),
      takeUntil(this.destroy$),
    )
      .subscribe(val => {
        if (val === 403) {
          this.authError = 'Wrong User & Password combination';
        }
      });
  }

  public onSubmit() {
    this.store$.dispatch(logInAction({ loginInfo: this.loginForm.value as ILogin }));
  }

  public goRegistration(): void {
    this.router.navigate(['user', 'registration']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
