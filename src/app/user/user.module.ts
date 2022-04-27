import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { UserRoutingModule } from 'src/app/user/user-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    LoginComponent,
    RegistrationComponent,
    EditUserComponent,
    RegistrationPageComponent,
    EditUserPageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class UserModule { }
