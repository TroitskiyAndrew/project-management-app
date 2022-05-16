import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '@redux/state.models';

export const usersSelector = createFeatureSelector<UsersState>('users');

export const selectCurrentUser = createSelector(
  usersSelector,
  (val) => val.currentUser,
);
export const selectCurrentUserId = createSelector(
  usersSelector,
  (val) => val.currentUser?._id || null,
);
export const selectAllUsers = createSelector(
  usersSelector,
  (val) => val.users,
);

export const selectUsersByIds = (ids: string[]) => createSelector(
  usersSelector,
  (val) => val.users.filter(item => ids.includes(item._id)),
);

export const selectUsersByIdsExceptCurrent = (ids: string[]) => createSelector(
  usersSelector,
  (val) => val.users.filter(item => ids.includes(item._id) && item._id !== val.currentUser?._id),
);
