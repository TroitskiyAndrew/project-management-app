
import { LangModel } from '@core/models/common.model';
import { createAction, props } from '@ngrx/store';

export const changeLangAction = createAction('[enviroment] lang', props<{ lang: LangModel }>());
export const addGuidAction = createAction('[enviroment] guid add', props<{ guid: string }>());
export const removeGuidAction = createAction('[enviroment] guid remove', props<{ guid: string }>());
