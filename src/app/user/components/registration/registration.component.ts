import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginFull } from '@core/models/auth.model';
import { ValidationService } from '@core/services/validation.service';
import { Store } from '@ngrx/store';
import { createUserAction } from '@redux/actions/current-user.actions';
import { AppState } from '@redux/state.models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public registrationForm!: FormGroup;

  public unavailableLogin = false;

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>, private router: Router) { }

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
