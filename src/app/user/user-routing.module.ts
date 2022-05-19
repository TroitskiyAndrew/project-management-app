import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { NotAuthGuard } from '@core/guards/not-auth.guard';
import { EditUserPageComponent } from 'src/app/user/pages/edit-user-page/edit-user-page.component';
import { RegistrationPageComponent } from 'src/app/user/pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: LoginPageComponent,
    canLoad: [NotAuthGuard],
    canActivate: [NotAuthGuard],
  },
  {
    path: 'registration', component: RegistrationPageComponent,
    canLoad: [NotAuthGuard],
    canActivate: [NotAuthGuard],
  },
  {
    path: 'edit', component: EditUserPageComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
