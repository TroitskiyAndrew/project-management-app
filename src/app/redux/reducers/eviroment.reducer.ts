import { createReducer, on } from '@ngrx/store';
import { addGuidAction, changeLangAction, removeGuidAction } from '@redux/actions/enviroment.actions';
import { EnviromentState } from '@redux/state.models';

const initialState: EnviromentState = {
  lang: 'en',
  guids: [],
  dropBlock: false,
};


export const enviromenReducer = createReducer(
  initialState,
  on(changeLangAction, (state, { lang }) => ({ ...state, lang })),
  on(addGuidAction, (state, { guid }) => ({ ...state, guids: [...state.guids, guid] })),
  on(removeGuidAction, (state, { guid }) => ({ ...state, guids: [...state.guids.filter(item => item !== guid)] })),
);
