import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HttpInterceptorProviders } from '@core/interceptors/interceptors-providers';
import { ValidationService } from '@core/services/validation.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@core/services/auth.service';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { WorkspacePageComponent } from './pages/workspace-page/workspace-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { PortalModule } from '@angular/cdk/portal';
import { PortalComponent } from './components/portal/portal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MainPageComponent,
    WorkspacePageComponent,
    BoardComponent,
    ListComponent,
    CardComponent,
    PortalComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild({}),
    PortalModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MainPageComponent,
    HttpClientModule,
    PortalComponent,
  ],
  providers: [HttpInterceptorProviders, ValidationService, AuthService],
})
export class CoreModule { }
