import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpInterceptorProviders } from '@core/interceptors/interceptors-providers';
import { ValidationService } from '@core/services/validation.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@core/services/auth.service';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HttpClientModule,
  ],
  providers: [HttpInterceptorProviders, ValidationService, AuthService],
})
export class CoreModule { }
