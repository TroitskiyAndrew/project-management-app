import { createAction, props } from '@ngrx/store';
import { IUser } from '@shared/models/user.model';

export const setUserAction = createAction('[current User] set', props<{ user: IUser | null }>());
export const clearUserAction = createAction('[current User] clear');
export const checkUserAction = createAction('[current User] check');
