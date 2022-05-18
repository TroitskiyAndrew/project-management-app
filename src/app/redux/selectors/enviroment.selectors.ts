import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnviromentState } from '@redux/state.models';

const enviromentStore = createFeatureSelector<EnviromentState>('enviroment');

export const selectLang = createSelector(
  enviromentStore,
  (val) => val.lang,
);

export const selectGuids = createSelector(
  enviromentStore,
  (val) => val.guids,
);

export const dropBlockSelector = createSelector(
  enviromentStore,
  (val) => val.dropBlock,
);

