import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '@redux/state.models';

const usersStore = createFeatureSelector<UsersState>('users');

export const selectCurrentUser = createSelector(
  usersStore,
  (val) => val.currentUser,
);
export const selectCurrentUserId = createSelector(
  usersStore,
  (val) => val.currentUser?._id || null,
);
export const selectAllUsers = createSelector(
  usersStore,
  (val) => val.users,
);
