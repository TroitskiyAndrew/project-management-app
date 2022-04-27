import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentUserState } from '@redux/state.models';

export const selectCurrentUser = createSelector(
  createFeatureSelector<CurrentUserState>('currentUser'),
  (val) => val.user,
);
