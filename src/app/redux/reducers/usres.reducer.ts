import { createReducer, on } from '@ngrx/store';
import { createUserSocketAction, deleteUserSocketAction, failRestoreUserAction, logoutUserAction, setAllUserAction, setUserAction, updateUserAction, updateUserSocketAction } from '@redux/actions/users.actions';
import { UsersState } from '@redux/state.models';
import * as utils from '../utils/utils';

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
  on(createUserSocketAction, utils.addUser),
  on(updateUserSocketAction, utils.updateUser),
  on(deleteUserSocketAction, utils.deleteUser),
);
