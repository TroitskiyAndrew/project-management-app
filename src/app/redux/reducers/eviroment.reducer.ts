import { createReducer, on } from '@ngrx/store';
import { changeLangAction } from '@redux/actions/enviroment.actions';
import { EnviromentState } from '@redux/state.models';

const initialState: EnviromentState = {
  lang: 'en',
};


export const enviromenReducer = createReducer(
  initialState,
  on(changeLangAction, (state, { lang }) => ({ ...state, lang })),
);
