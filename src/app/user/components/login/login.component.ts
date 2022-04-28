import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '@core/models/auth.model';
import { Store } from '@ngrx/store';
import { logInAction } from '@redux/actions/current-user.actions';
import { AppState } from '@redux/state.models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  public incorrectAuth = false;

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    this.store$.dispatch(logInAction({ loginInfo: this.loginForm.value as ILogin }));
  }

  public goRegistration(): void {
    this.router.navigate(['user', 'registration']);
  }

}
