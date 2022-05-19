import { ApiResponse } from '@core/models/common.model';
import { createAction, props } from '@ngrx/store';

export const errorResponseAction = createAction('[api response] error', props<{ error: ApiResponse }>());
export const successResponseAction = createAction('[api response] success', props<{ message: string }>());
export const cleareResponseAction = createAction('[api response] cleare');
