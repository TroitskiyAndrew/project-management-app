import { ILogin, ILoginFull, IUserNewParams, UserFace } from '@core/models/auth.model';
import { NotifyCallBack } from '@core/models/common.model';
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
export const failRestoreUserAction = createAction('[User] restore fail');

export const getAllUsersAction = createAction('[User] get all');
export const setAllUserAction = createAction('[User] set all', props<{ users: IUser[] }>());

export const createUserSocketAction = createAction('[socket][users] create', props<{ users: IUser[], _notifCallBack: NotifyCallBack }>());
export const updateUserSocketAction = createAction('[socket][users] update', props<{ users: IUser[], _notifCallBack: NotifyCallBack }>());
export const deleteUserSocketAction = createAction('[socket][users] delete', props<{ users: IUser[], _notifCallBack: NotifyCallBack }>());
