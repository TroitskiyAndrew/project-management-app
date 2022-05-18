
import { createAction, props } from '@ngrx/store';
import { NewColumnModel, ColumnModel } from '@shared/models/board.model';


export const createColumnAction = createAction('[columns] create', props<{ newColumn: NewColumnModel }>());
export const getAllColumnsAction = createAction('[columns] get all');
export const setColumnsAction = createAction('[columns] set', props<{ columns: ColumnModel[] }>());
export const deleteColumnAction = createAction('[columns] delete', props<{ id: string }>());
export const updateColumnAction = createAction('[columns] update', props<{ newParams: NewColumnModel, id: string }>());
export const updateSetOfColumnsAction = createAction('[columns] update set', props<{ columns: ColumnModel[] }>());

export const addColumnsToStoreAction = createAction('[columns][store] add', props<{ columns: ColumnModel[] }>());
export const updateColumnsInStoreAction = createAction('[columns][store] update', props<{ columns: ColumnModel[] }>());
export const deleteColumnsFromStoreAction = createAction('[columns][store] delete', props<{ columns: ColumnModel[] }>());

export const addColumnsSocketAction = createAction('[socket][columns] add', props<{ ids: string[], notify: boolean, initUser: string }>());
export const updateColumnsSocketAction = createAction('[socket][columns] update', props<{ ids: string[] }>());
export const deleteColumnsSocketAction = createAction('[socket][columns] delete', props<{ ids: string[] }>());
