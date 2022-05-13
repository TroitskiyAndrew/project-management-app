import { Injectable } from '@angular/core';
import { LangModel } from '@core/models/common.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@redux/state.models';
import { CookieService } from 'ngx-cookie-service';

import localization from 'src/assets/localization';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {

  private currentLang!: LangModel;

  constructor(private translate: TranslateService, private cookieService: CookieService, private store$: Store<AppState>) {
    this.translate.setTranslation('en', this.getTranslateObject('en'));
    this.translate.setTranslation('ru', this.getTranslateObject('ru'));
  }

  public changeLang(lang: LangModel): void {
    this.currentLang = lang;
    this.cookieService.set('project-manager-lang', lang);
    this.translate.use(lang);
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

  public translateString(str: string): string {
    const rexExp = /\${(?<key>\w|.*)}/;
    const match = str.match(rexExp);
    if (!match) {
      return str;
    }
    const key = match.groups!['key'];
    let tranlate = this.getTranslateObject(this.currentLang);
    for (const point of key.split('.')) {
      if (!tranlate[point]) {
        break;
      }
      tranlate = tranlate[point];
    }
    if (typeof tranlate !== 'string') {
      tranlate = '${Translate not founded}';
    }

    return str.replace(rexExp, tranlate);
  }


}
