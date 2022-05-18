import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginFull } from '@shared/models/user.model';
import { ValidationService } from '@core/services/validation.service';
import { Store } from '@ngrx/store';
import { createUserAction } from '@redux/actions/users.actions';
import { selectApiResponseMessage } from '@redux/selectors/api-response.selectors';
import { AppState } from '@redux/state.models';
import { filter, Subject, takeUntil } from 'rxjs';
import { LocalizationService } from '@core/services/localization.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public registrationForm!: FormGroup;

  public registrationError = '';

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>, private router: Router, private local: LocalizationService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, ValidationService.isValidPassword]],
      passwordRepeat: [''],
    });

    this.registrationForm.controls['password'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.registrationForm.controls['passwordRepeat'].setValidators([ValidationService.isEqualString(value)]);
        this.registrationForm.controls['passwordRepeat'].setValue(this.registrationForm.value.passwordRepeat);
      });

    this.store$.select(selectApiResponseMessage).pipe(
      filter(val => Boolean(val)),
      takeUntil(this.destroy$),
    ).subscribe(val => this.registrationError = this.local.translateString(val as string));
  }

  public onSubmit() {
    const newUser: ILoginFull = {
      name: this.registrationForm.value.name,
      login: this.registrationForm.value.login,
      password: this.registrationForm.value.password,
    };
    this.store$.dispatch(createUserAction({ newUser: newUser }));
  }

  public goLogin(): void {
    this.router.navigate(['user', 'login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
