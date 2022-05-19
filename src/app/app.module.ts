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
import { UsersEffects } from '@redux/effects/users.effetcs';
import { BoardsEffects } from '@redux/effects/boards.effects';
import { ApiResposeEffects } from '@redux/effects/api-response.effects';
import { TranslateModule } from '@ngx-translate/core';
import { NotifierModule } from 'angular-notifier';
import { notifierConfig } from 'src/environments/notifierConfig';
import { ColumnsEffects } from '@redux/effects/columns.effects';
import { FilesEffects } from '@redux/effects/files.effects';
import { TasksEffects } from '@redux/effects/tasks.effects';
import { EnviromentEffects } from '@redux/effects/enviroment.effects';
import { PointsEffects } from '@redux/effects/points.effects';
import { SharedModule } from '@shared/shared.module';

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
    NotifierModule.withConfig(notifierConfig),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UsersEffects, ApiResposeEffects, BoardsEffects, ColumnsEffects, TasksEffects, FilesEffects, EnviromentEffects, PointsEffects]),
    StoreRouterConnectingModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
    }),
    SharedModule,
  ],

  providers: [{ provide: RouterStateSerializer, useClass: RouterSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule { }
