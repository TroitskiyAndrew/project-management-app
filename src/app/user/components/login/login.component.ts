import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '@shared/models/user.model';
import { Store } from '@ngrx/store';
import { logInAction } from '@redux/actions/users.actions';
import { selectApiResponseMessage } from '@redux/selectors/api-response.selectors';
import { AppState } from '@redux/state.models';
import { filter, Subject, takeUntil } from 'rxjs';
import { LocalizationService } from '@core/services/localization.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public loginForm!: FormGroup;

  public authError = '';

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>, private router: Router, private local: LocalizationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.store$.select(selectApiResponseMessage).pipe(
      filter(val => Boolean(val)),
      takeUntil(this.destroy$),
    ).subscribe(val => this.authError = this.local.translateString(val as string));
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
