import { ColumnModel, NewColumnModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';
import { NotifyCallBack } from '@core/models/common.model';


export const createColumnAction = createAction('[columns] create', props<{ newColumn: NewColumnModel }>());
export const getAllColumnsAction = createAction('[columns] get all');
export const setColumnsAction = createAction('[columns] set', props<{ columns: ColumnModel[] }>());
export const deleteColumnAction = createAction('[columns] delete', props<{ id: string }>());
export const updateColumnAction = createAction('[columns] update', props<{ newParams: NewColumnModel, id: string }>());
export const updateSetOfColumnsAction = createAction('[columns] update set', props<{ columns: ColumnModel[] }>());

export const addColumnsToStoreAction = createAction('[columns][store] add', props<{ columns: ColumnModel[] }>());
export const updateColumnsInStoreAction = createAction('[columns][store] update', props<{ columns: ColumnModel[] }>());
export const deleteColumnsFromStoreAction = createAction('[columns][store] delete', props<{ columns: ColumnModel[] }>());

export const createColumnSocketAction = createAction('[socket][columns] create', props<{ columns: ColumnModel[], _notifCallBack: NotifyCallBack }>());
export const updateColumnSocketAction = createAction('[socket][columns] update', props<{ columns: ColumnModel[], _notifCallBack: NotifyCallBack }>());
export const deleteColumnSocketAction = createAction('[socket][columns] delete', props<{ columns: ColumnModel[], _notifCallBack: NotifyCallBack }>());
