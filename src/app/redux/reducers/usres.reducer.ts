import { createReducer, on } from '@ngrx/store';
import { addUsersToStoreAction, deleteUsersFromStoreAction, deleteUsersSocketAction, failRestoreUserAction, logoutUserAction, setAllUserAction, setUserAction, updateUserAction, updateUsersInStoreAction } from '@redux/actions/users.actions';
import { UsersState } from '@redux/state.models';

const initialState: UsersState = {
  currentUser: null,
  loaded: false,
  users: [],
};


export const UsersReducer = createReducer(
  initialState,
  on(setUserAction, (state, { user }) => ({ ...state, currentUser: user, loaded: true })),
  on(updateUserAction, (state, { params }) => {
    return {
      ...state,
      currentUser: {
        _id: state.currentUser?._id || '',
        ...params,
      },
    };
  }),
  on(logoutUserAction, (state) => ({ ...state, currentUser: null })),
  on(failRestoreUserAction, (state) => ({ ...state, loaded: true })),
  on(setAllUserAction, (state, { users }) => ({ ...state, users: users })),
  on(addUsersToStoreAction, (state, { users }) => ({ ...state, users: [...state.users, ...users] })),
  on(updateUsersInStoreAction, (state, { users }) => ({ ...state, users: [...state.users.filter(item => !users.map(it => it._id).includes(item._id)), ...users] })),
  on(deleteUsersFromStoreAction, (state, { users }) => ({ ...state, users: [...state.users.filter(item => !users.map(it => it._id).includes(item._id))] })),
  on(deleteUsersSocketAction, (state, { ids }) => ({ ...state, users: [...state.users.filter(item => !ids.includes(item._id))] })),

);
