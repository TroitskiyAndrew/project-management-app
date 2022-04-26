import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from 'src/app/auth/pages/login-page/login-page.component';


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'registration', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
