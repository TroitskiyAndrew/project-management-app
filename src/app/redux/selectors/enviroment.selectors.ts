import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnviromentState } from '@redux/state.models';

const enviromentStore = createFeatureSelector<EnviromentState>('enviroment');

export const selectLang = createSelector(
  enviromentStore,
  (val) => val.lang,
);

