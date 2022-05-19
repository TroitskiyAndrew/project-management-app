
import { LangModel } from '@core/models/common.model';
import { createAction, props } from '@ngrx/store';

export const changeLangAction = createAction('[enviroment] lang', props<{ lang: LangModel }>());
export const addGuidAction = createAction('[enviroment] guid add', props<{ guid: string }>());
export const removeGuidAction = createAction('[enviroment] guid remove', props<{ guid: string }>());

export const setDropBlocAction = createAction('[enviroment] set block');
export const clearDropBlocAction = createAction('[enviroment] cleare block');

export const startEditBoardAction = createAction('[enviroment] edit board start');
export const stopEditBoardAction = createAction('[enviroment] edit board end');
