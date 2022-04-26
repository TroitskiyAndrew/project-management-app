import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin, ISignUp } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { ValidationService } from '@core/services/validation.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Input() public isLogin: boolean = true;

  public form!: FormGroup;

  public availableLogin = true;

  public correctAuth = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    if (!this.isLogin) {
      this.form.addControl('name', this.formBuilder.control('', Validators.required));
      this.form.controls['password'].addValidators(ValidationService.isValidPassword);
    }
  }

  public onSubmit() {
    if (this.isLogin) {
      this.authService.logIn(this.form.value as ILogin)
        .pipe(take(1))
        .subscribe((val: boolean) => this.correctAuth = val);
    } else {
      this.authService.regestry(this.form.value as ISignUp)
        .pipe(take(1))
        .subscribe((val: boolean) => {
          this.availableLogin = val;
        });
    }
  }

  public changeForm(): void {
    this.isLogin = !this.isLogin;
    this.ngOnInit();
  }

}
