import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApiResponseState } from '@redux/state.models';

export const selectResponse = createFeatureSelector<ApiResponseState>('apiResponse');

export const selectApiResponseMessage = createSelector(
  selectResponse,
  state => {
    return state.response ? state.response.message : null;
  },
);

export const selectApiResponseCode = createSelector(
  selectResponse,
  state => {
    return state.response ? state.response.statusCode : null;
  },
);
