import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { restoreUserAction } from '@redux/actions/current-user.actions';
import { AppState } from '@redux/state.models';
import { TranslateService } from '@ngx-translate/core';
import { getTranslate } from 'src/assets/localization';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private store$: Store<AppState>, private translate: TranslateService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.store$.dispatch(restoreUserAction());
    this.translate.setTranslation('en', getTranslate('en'));
    this.translate.setTranslation('ru', getTranslate('ru'));
    const lastUsedLang = this.cookieService.get('project-manager-lang');
    if (lastUsedLang) {
      this.translate.use(lastUsedLang);
    }
  }
}
