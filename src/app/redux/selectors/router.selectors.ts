import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from 'src/app/redux/state.models';

export const selectRouter = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const selectId = createSelector(
  selectRouter,
  router => router.state.params['id'],
);
