import { createReducer, on } from '@ngrx/store';
import { failRestoreUserAction, logoutUserAction, setAllUserAction, setUserAction, updateUserAction } from '@redux/actions/users.actions';
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
);
