import { createReducer, on } from '@ngrx/store';
import { clearUserAction, setUserAction } from '@redux/actions/current-user.actions';
import { CurrentUserState } from '@redux/state.models';

const initialState: CurrentUserState = {
  user: null,
};


export const currentUserReducer = createReducer(
  initialState,
  on(setUserAction, (state, { user }) => { return { user: user }; }),
  on(clearUserAction, () => { return { user: null }; }),
);
