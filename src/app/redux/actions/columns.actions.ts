import { ColumnModel, NewColumnModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';


export const createColumnAction = createAction('[columns] create', props<{ newColumn: NewColumnModel }>());
export const getColumnsAction = createAction('[columns] get');
export const setColumnsAction = createAction('[columns] set', props<{ columns: ColumnModel[] }>());
export const deleteColumnAction = createAction('[columns] delete', props<{ id: string }>());
export const updateColumnAction = createAction('[columns] update', props<{ newParams: NewColumnModel, id: string }>());

