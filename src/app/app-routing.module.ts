import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { MainPageComponent } from '@core/pages/main-page/main-page.component';
import { PageNotFoundComponent } from '@core/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainPageComponent },
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then((m) => m.BoardModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
