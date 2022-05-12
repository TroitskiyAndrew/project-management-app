import { ColumnModel, NewColumnModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';
import { NotifyCallBack } from '@core/models/common.model';


export const createColumnAction = createAction('[columns] create', props<{ newColumn: NewColumnModel }>());
export const getColumnsAction = createAction('[columns] get', props<{ boards: string[] }>());
export const setColumnsAction = createAction('[columns] set', props<{ columns: ColumnModel[] }>());
export const deleteColumnAction = createAction('[columns] delete', props<{ id: string }>());
export const updateColumnAction = createAction('[columns] update', props<{ newParams: NewColumnModel, id: string }>());
export const updateSetOfColumnsAction = createAction('[columns] update set', props<{ columns: ColumnModel[] }>());

export const createColumnSocketAction = createAction('[socket][columns] create', props<{ columns: ColumnModel[], _notifCallBack: NotifyCallBack }>());
export const updateColumnSocketAction = createAction('[socket][columns] update', props<{ columns: ColumnModel[], _notifCallBack: NotifyCallBack }>());
export const deleteColumnSocketAction = createAction('[socket][columns] delete', props<{ columns: ColumnModel[], _notifCallBack: NotifyCallBack }>());
