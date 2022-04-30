import { createReducer, on } from '@ngrx/store';
import { errorResponseAction, successResponseAction, cleareResponseAction } from '@redux/actions/api-respone.actions';
import { ApiResponseState } from '@redux/state.models';

const initialState: ApiResponseState = {
  response: null,
};


export const apiResponseReducer = createReducer(
  initialState,
  on(errorResponseAction, (state, { error }) => ({ response: error })),
  on(successResponseAction, () => ({ response: { statusCode: 200, message: 'success' } })),
  on(cleareResponseAction, () => ({ response: null })),
);
