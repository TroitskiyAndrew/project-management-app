import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspacePageComponent } from 'src/app/board/pages/workspace-page/workspace-page.component';



const routes: Routes = [
  { path: ':id', component: WorkspacePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule { }
