
import { createAction, props } from '@ngrx/store';
import { ILogin, ILoginFull, IUser, IUserNewParams, UserFace } from '@shared/models/user.model';

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

export const addUsersToStoreAction = createAction('[User][store] add', props<{ users: IUser[] }>());
export const updateUsersInStoreAction = createAction('[User][store] edit', props<{ users: IUser[] }>());
export const deleteUsersFromStoreAction = createAction('[User][store] delete', props<{ users: IUser[] }>());

export const addUsersSocketAction = createAction('[socket][users] add', props<{ ids: string[] }>());
export const updateUsersSocketAction = createAction('[socket][users] update', props<{ ids: string[] }>());
export const deleteUsersSocketAction = createAction('[socket][users] delete', props<{ ids: string[] }>());
