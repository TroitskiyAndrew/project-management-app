import { createReducer, on } from '@ngrx/store';
import { errorResponseAction, successResponseAction, cleareErrorAction } from '@redux/actions/api-respone.actions';
import { ApiResponse } from '@redux/state.models';

const initialState: ApiResponse = {
  response: null,
};


export const apiResponseReducer = createReducer(
  initialState,
  on(errorResponseAction, (state, { error }) => { return { response: error }; }),
  on(successResponseAction, () => { return { response: null }; }),
  on(cleareErrorAction, () => { return { response: null }; }),
);
