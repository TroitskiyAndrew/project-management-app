import { NewPointModel, PointModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';
import { NotifyCallBack } from '@core/models/common.model';

export const createPointAction = createAction('[points] create', props<{ newPoint: NewPointModel }>());
export const getAllPointsAction = createAction('[points] get all');
export const setPointsAction = createAction('[points] set', props<{ points: PointModel[] }>());
export const deletePointAction = createAction('[points] delete', props<{ id: string }>());
export const updatePointAction = createAction('[points] update', props<{ newParams: NewPointModel, id: string }>());
export const updateSetOfPointsAction = createAction('[points] update set', props<{ points: PointModel[] }>());

export const addPointsToStoreAction = createAction('[points][store] add', props<{ points: PointModel[] }>());
export const updatePointsInStoreAction = createAction('[points][store] update', props<{ points: PointModel[] }>());
export const deletePointsFromStoreAction = createAction('[points][store] delete', props<{ points: PointModel[] }>());

export const createPointSocketAction = createAction('[socket][points] create', props<{ points: PointModel[], _notifCallBack: NotifyCallBack }>());
export const updatePointSocketAction = createAction('[socket][points] update', props<{ points: PointModel[], _notifCallBack: NotifyCallBack }>());
export const deletePointSocketAction = createAction('[socket][points] delete', props<{ points: PointModel[], _notifCallBack: NotifyCallBack }>());
