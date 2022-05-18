import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HttpInterceptorProviders } from '@core/interceptors/interceptors-providers';
import { ValidationService } from '@core/services/validation.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '@core/services/users.service';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PortalModule } from '@angular/cdk/portal';
import { PortalComponent } from './components/portal/portal.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MainPageComponent,
    PortalComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild({}),
    PortalModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MainPageComponent,
    HttpClientModule,
    PortalComponent,
  ],
  providers: [HttpInterceptorProviders, ValidationService, UsersService],
})
export class CoreModule { }
