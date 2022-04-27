import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  public incorrectAuth = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    this.authService.logIn(this.loginForm.value as ILogin)
      .pipe(take(1))
      .subscribe((val: boolean) => this.incorrectAuth = !val);
  }

  public goRegistration(): void {
    this.router.navigate(['user', 'registration']);
  }

}
