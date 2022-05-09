import { createReducer, on } from '@ngrx/store';
import { logoutUserAction, setAllUserAction, setUserAction, updateUserAction } from '@redux/actions/users.actions';
import { UsersState } from '@redux/state.models';

const initialState: UsersState = {
  currentUser: null,
};


export const UsersReducer = createReducer(
  initialState,
  on(setUserAction, (state, { user }) => ({ ...state, currentUser: user })),
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
  on(setAllUserAction, (state, { users }) => ({ ...state, users: users })),
);
