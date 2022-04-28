import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApiResponse } from '@redux/state.models';

export const selectResponse = createFeatureSelector<ApiResponse>('apiResponse');

export const selectApiErrorMessage = createSelector(
  selectResponse,
  state => {
    return state.response ? state.response.message : null;
  },
);

export const selectApiErrorCode = createSelector(
  selectResponse,
  state => {
    return state.response ? state.response.statusCode : null;
  },
);
