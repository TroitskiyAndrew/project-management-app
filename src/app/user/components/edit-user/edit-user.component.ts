import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserNewParams } from '@core/models/auth.model';
import { ValidationService } from '@core/services/validation.service';
import { Store } from '@ngrx/store';
import { editUserAction } from '@redux/actions/users.actions';
import { selectApiResponseCode } from '@redux/selectors/api-response.selectors';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { skip, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {

  public editForm!: FormGroup;

  private currentUser!: IUser;

  private destroy$ = new Subject<void>();

  public editError = '';

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>, private location: Location) { }

  ngOnInit(): void {

    this.store$.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$)).subscribe((val) => {
        if (!val) {
          return;
        }
        this.currentUser = val as IUser;
        setTimeout(() => {
          this.editForm.controls['name'].setValue(this.currentUser.name);
          this.editForm.controls['login'].setValue(this.currentUser.login);
          this.editForm.controls['password'].setValue('');
        });
      });

    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      newPassword: ['', [ValidationService.isEmptyOrValidPassword]],
      newPasswordRepeat: [''],
    });

    this.editForm.controls['newPassword'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.editForm.controls['newPasswordRepeat'].setValidators([ValidationService.isEqualString(value)]);
        this.editForm.controls['newPasswordRepeat'].setValue(this.editForm.value.newPasswordRepeat);
      });

    this.store$.select(selectApiResponseCode).pipe(
      skip(1),
      takeUntil(this.destroy$),
    )
      .subscribe(val => {
        if (val === 500) {
          this.editError = 'User login already exists!';
        } else if (val === 403) {
          this.editError = 'Wrong password';
        }
      });

  }

  public onSubmit() {
    const newParams: IUserNewParams = {
      name: this.editForm.value.name,
      login: this.editForm.value.login,
      password: this.editForm.value.password,
    };
    if (this.editForm.value.newPassword) {
      newParams.newPassword = this.editForm.value.newPassword;
    }
    this.store$.dispatch(editUserAction({ newParams: newParams }));
    this.editForm.controls['password'].setValue('');
    this.editForm.controls['newPassword'].setValue('');
    this.editForm.controls['newPasswordRepeat'].setValue('');
  }

  public goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
