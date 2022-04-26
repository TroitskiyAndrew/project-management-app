import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpInterceptorProviders } from '@core/interceptors/interceptors-providers';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  providers: [HttpInterceptorProviders],
})
export class CoreModule { }
