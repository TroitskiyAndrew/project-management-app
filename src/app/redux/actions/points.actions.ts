import { NewPointModel, PointModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';

export const createPointAction = createAction('[points] create', props<{ newPoint: NewPointModel }>());
export const getAllPointsAction = createAction('[points] get all');
export const setPointsAction = createAction('[points] set', props<{ points: PointModel[] }>());
export const deletePointAction = createAction('[points] delete', props<{ id: string }>());
export const updatePointAction = createAction('[points] update', props<{ newParams: NewPointModel, id: string }>());
export const updateSetOfPointsAction = createAction('[points] update set', props<{ points: PointModel[] }>());

export const addPointsToStoreAction = createAction('[points][store] add', props<{ points: PointModel[] }>());
export const updatePointsInStoreAction = createAction('[points][store] update', props<{ points: PointModel[] }>());
export const deletePointsFromStoreAction = createAction('[points][store] delete', props<{ points: PointModel[] }>());

export const addPointsSocketAction = createAction('[socket][points] add', props<{ ids: string[], notify: boolean, initUser: string }>());
export const updatePointsSocketAction = createAction('[socket][points] update', props<{ ids: string[], notify: boolean, initUser: string }>());
export const deletePointsSocketAction = createAction('[socket][points] delete', props<{ ids: string[], notify: boolean, initUser: string }>());
