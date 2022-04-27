import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignUp } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { ValidationService } from '@core/services/validation.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public registrationForm!: FormGroup;

  public unavailableLogin = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, ValidationService.isValidPassword]],
    });
  }

  public onSubmit() {
    this.authService.regestry(this.registrationForm.value as ISignUp)
      .pipe(take(1))
      .subscribe((val: boolean) => {
        this.unavailableLogin = !val;
      });
  }

  public goLogin(): void {
    this.router.navigate(['user', 'login']);
  }

}
