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

export const selectUsersByIds = (ids: string[]) => createSelector(
  usersStore,
  (val) => val.users.filter(item => ids.includes(item._id)),
);

export const selectUsersByIdsExceptCurrent = (ids: string[]) => createSelector(
  usersStore,
  (val) => val.users.filter(item => ids.includes(item._id) && item._id !== val.currentUser?._id),
);
