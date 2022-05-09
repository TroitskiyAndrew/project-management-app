import { ILogin, ILoginFull, IUserNewParams, UserFace } from '@core/models/auth.model';
import { createAction, props } from '@ngrx/store';
import { IUser } from '@shared/models/user.model';

export const logInAction = createAction('[User] login', props<{ loginInfo: ILogin }>());
export const createUserAction = createAction('[User] create', props<{ newUser: ILoginFull }>());
export const editUserAction = createAction('[User] edit', props<{ newParams: IUserNewParams }>());
export const setUserAction = createAction('[User] set', props<{ user: IUser }>());
export const updateUserAction = createAction('[User] update', props<{ params: UserFace }>());
export const deleteUserAction = createAction('[User] delete');
export const logoutUserAction = createAction('[User] logout');
export const restoreUserAction = createAction('[User] restore');

export const getUsersAction = createAction('[User] get all');
export const setAllUserAction = createAction('[User] set all', props<{ users: IUser[] }>());
