import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from '@redux/reducers';
import { RouterSerializer } from '@redux/serialaizers/router.serializer';
import { CoreModule } from '@core/core.module';
import { AuthEffects } from '@redux/effects/current-user.effetcs';
import { TasksModule } from './tasks/tasks.module';
import { BoardsEffects } from '@redux/effects/boards.effects';
import { ApiResposeEffects } from '@redux/effects/api-response.effects';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    TasksModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, ApiResposeEffects, BoardsEffects]),
    StoreRouterConnectingModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
    }),
  ],

  providers: [{ provide: RouterStateSerializer, useClass: RouterSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule { }
