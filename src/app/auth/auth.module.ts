import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';



@NgModule({
  declarations: [
    LoginPageComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [AuthModule],
})
export class AuthModule { }
