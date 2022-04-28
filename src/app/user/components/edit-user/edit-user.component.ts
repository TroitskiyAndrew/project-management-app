import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILoginFull } from '@core/models/auth.model';
import { ValidationService } from '@core/services/validation.service';
import { Store } from '@ngrx/store';
import { editUserAction, deleteUserAction } from '@redux/actions/current-user.actions';
import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState } from '@redux/state.models';
import { IStateUser } from '@shared/models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {

  public editForm!: FormGroup;

  private currentUser!: IStateUser;

  private destroy$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>, private location: Location) { }

  ngOnInit(): void {

    this.store$.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$)).subscribe((val) => {
        this.currentUser = val as IStateUser;
        setTimeout(() => {
          this.editForm.controls['name'].setValue(this.currentUser.name);
          this.editForm.controls['login'].setValue(this.currentUser.login);
          this.editForm.controls['password'].setValidators([Validators.required, ValidationService.isEqualString(this.currentUser.password)]);
          this.editForm.controls['password'].setValue('');
          this.editForm.controls['newPassword'].setValidators([ValidationService.isEmptyOrValidPassword, ValidationService.isNotEqualString(this.currentUser.password)]);
        });
      });

    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: [''],
      newPassword: [''],
      newPasswordRepeat: [''],
    });

    this.editForm.controls['newPassword'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.editForm.controls['newPasswordRepeat'].setValidators([ValidationService.isEqualString(value)]);
        this.editForm.controls['newPasswordRepeat'].setValue(this.editForm.value.newPasswordRepeat);
      });

  }

  public onSubmit() {
    const newParams: ILoginFull = {
      name: this.editForm.value.name,
      login: this.editForm.value.login,
      password: this.editForm.value.newPassword || this.editForm.value.password,
    };
    this.store$.dispatch(editUserAction({ newParams: newParams }));
    this.editForm.controls['password'].setValue('');
    this.editForm.controls['newPassword'].setValue('');
    this.editForm.controls['newPasswordRepeat'].setValue('');
  }

  public deleteUser() {
    this.store$.dispatch(deleteUserAction());
  }

  public goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
