import { createReducer, on } from '@ngrx/store';
import { logoutUserAction, setUserAction, updateUserAction } from '@redux/actions/current-user.actions';
import { CurrentUserState } from '@redux/state.models';

const initialState: CurrentUserState = {
  user: null,
};


export const currentUserReducer = createReducer(
  initialState,
  on(setUserAction, (state, { user }) => { return { ...state, user: user }; }),
  on(updateUserAction, (state, { params }) => {
    return {
      ...state,
      user: {
        _id: state.user?._id || '',
        ...params,
      },
    };
  }),
  on(logoutUserAction, (state) => { return { ...state, user: null }; }),
);
