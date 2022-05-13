
import { LangModel } from '@core/models/common.model';
import { createAction, props } from '@ngrx/store';

export const changeLangAction = createAction('[enviroment] lang', props<{ lang: LangModel }>());
