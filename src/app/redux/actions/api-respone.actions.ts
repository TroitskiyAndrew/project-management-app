import { ApiError } from '@core/models/common.model';
import { createAction, props } from '@ngrx/store';

export const errorResponseAction = createAction('[api response] error', props<{ error: ApiError }>());
export const successResponseAction = createAction('[api response] success');
export const cleareErrorAction = createAction('[api response] cleare');
