import { Injectable, OnDestroy } from '@angular/core';
import { LangModel } from '@core/models/common.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { changeLangAction } from '@redux/actions/enviroment.actions';
import { selectLang } from '@redux/selectors/enviroment.selectors';
import { AppState } from '@redux/state.models';
import { NotifierService } from 'angular-notifier';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';

import localization from 'src/assets/localization';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private translate: TranslateService, private cookieService: CookieService, private notifier: NotifierService, private store$: Store<AppState>) {
    this.translate.setTranslation('en', this.getTranslateObject('en'));
    this.translate.setTranslation('ru', this.getTranslateObject('ru'));
    const lastUsedLang = this.cookieService.get('project-manager-lang');
    if (lastUsedLang) {
      this.store$.dispatch(changeLangAction({ lang: lastUsedLang as LangModel }));
    }
    this.store$.select(selectLang).pipe(takeUntil(this.destroy$)).subscribe((lang: LangModel) => {
      this.cookieService.set('project-manager-lang', lang);
      this.translate.use(lang);
      console.log(lang);
      switch (lang) {
        case 'en':
          console.log(lang);
          this.notifier.notify('success', 'Welcome! English language was selected');
          break;
        case 'ru':
          console.log(lang);
          this.notifier.notify('success', 'Добро пожаловать! Выбран русский язык');
          break;
      }
    });
  }


  private readLocalization(obj: any, lang: string) {
    if (obj[lang]) {
      return obj[lang];
    } else {
      const result: { [key: string]: any } = {};
      for (const key of Object.keys(obj) as string[]) {
        result[key] = this.readLocalization(obj[key], lang);
      }
      return result;
    }
  }

  public getTranslateObject(lang: string) {
    return this.readLocalization(localization, lang);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
