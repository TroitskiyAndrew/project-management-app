import { createReducer, on } from '@ngrx/store';
import { errorResponseAction, successResponseAction, cleareResponseAction } from '@redux/actions/api-respone.actions';
import { ApiResponseState } from '@redux/state.models';

const initialState: ApiResponseState = {
  response: null,
};


export const apiResponseReducer = createReducer(
  initialState,
  on(errorResponseAction, (state, { error }) => { return { response: error }; }),
  on(successResponseAction, () => { return { response: { statusCode: 200, message: 'success' } }; }),
  on(cleareResponseAction, () => { return { response: null }; }),
);
