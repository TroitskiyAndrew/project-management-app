import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from '@redux/reducers';
import { RouterSerializer } from '@redux/serialaizers/router.serializer';
import { CoreModule } from '@core/core.module';
import { AuthEffects } from '@redux/effects/auth.effetcs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouterSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule { }
