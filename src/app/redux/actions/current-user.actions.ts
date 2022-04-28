import { ILogin, ILoginFull } from '@core/models/auth.model';
import { createAction, props } from '@ngrx/store';
import { IStateUser } from '@shared/models/user.model';

export const logInAction = createAction('[User] login', props<{ loginInfo: ILogin }>());
export const createUserAction = createAction('[User] create', props<{ newUser: ILoginFull }>());
export const editUserAction = createAction('[User] edit', props<{ newParams: ILoginFull }>());
export const setUserAction = createAction('[User] set', props<{ user: IStateUser }>());
export const updateUserAction = createAction('[User] update', props<{ params: ILoginFull }>());
export const deleteUserAction = createAction('[User] delete');
export const logoutUserAction = createAction('[User] logout');

export const restoreUserAction = createAction('[User] restore');
