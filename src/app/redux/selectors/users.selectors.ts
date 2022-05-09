import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '@redux/state.models';

const usersStore = createFeatureSelector<UsersState>('users');

export const selectCurrentUser = createSelector(
  usersStore,
  (val) => val.currentUser,
);
